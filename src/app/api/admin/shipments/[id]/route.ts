import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { shipmentSchema } from '@/lib/validations';
import type { Shipment } from '@/types/database';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('shipments')
    .select('*, tracking_events(*)')
    .eq('id', id)
    .single();

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(data as Shipment);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const parsed = shipmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Separate location fields so we can handle missing columns gracefully
  const { current_lat, current_lng, delivery_price, ...coreData } = parsed.data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabaseAny = supabase as any;

  // First attempt: full update including location columns
  let { data, error } = await supabaseAny
    .from('shipments')
    .update({
      ...coreData,
      weight: coreData.weight ?? null,
      estimated_delivery: coreData.estimated_delivery || null,
      current_lat: current_lat ?? null,
      current_lng: current_lng ?? null,
      delivery_price: delivery_price ?? null,
    })
    .eq('id', id)
    .select()
    .single();

  // If location columns don't exist yet (migration not run), retry without them
  if (error && error.message?.includes('current_lat')) {
    ({ data, error } = await supabaseAny
      .from('shipments')
      .update({
        ...coreData,
        weight: coreData.weight ?? null,
        estimated_delivery: coreData.estimated_delivery || null,
        delivery_price: delivery_price ?? null,
      })
      .eq('id', id)
      .select()
      .single());
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data as Shipment);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { error } = await supabase.from('shipments').delete().eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

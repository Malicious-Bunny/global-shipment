import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { shipmentSchema } from '@/lib/validations';
import { generateTrackingNumber } from '@/lib/tracking';
import type { Shipment } from '@/types/database';

export async function GET() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('shipments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data as Shipment[]);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const parsed = shipmentSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { status, current_lat, current_lng, delivery_price, ...rest } = parsed.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabaseAny = supabase as any;

  let { data, error } = await supabaseAny
    .from('shipments')
    .insert({
      ...rest,
      status,
      tracking_number: generateTrackingNumber(),
      weight: rest.weight ?? null,
      estimated_delivery: rest.estimated_delivery || null,
      current_lat: current_lat ?? null,
      current_lng: current_lng ?? null,
      delivery_price: delivery_price ?? null,
    })
    .select()
    .single();

  // Retry without location columns if migration hasn't been run yet
  if (error && error.message?.includes('current_lat')) {
    ({ data, error } = await supabaseAny
      .from('shipments')
      .insert({
        ...rest,
        status,
        tracking_number: generateTrackingNumber(),
        weight: rest.weight ?? null,
        estimated_delivery: rest.estimated_delivery || null,
        delivery_price: delivery_price ?? null,
      })
      .select()
      .single());
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data as Shipment, { status: 201 });
}

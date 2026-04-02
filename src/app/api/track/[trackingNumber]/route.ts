import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ShipmentWithEvents, TrackingEvent } from '@/types/database';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  const { trackingNumber } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('shipments')
    .select('*, tracking_events(*)')
    .eq('tracking_number', trackingNumber.toUpperCase())
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
  }

  const shipment = data as unknown as ShipmentWithEvents;

  if (shipment.tracking_events) {
    shipment.tracking_events.sort(
      (a: TrackingEvent, b: TrackingEvent) =>
        new Date(b.event_timestamp).getTime() - new Date(a.event_timestamp).getTime()
    );
  }

  return NextResponse.json(shipment);
}

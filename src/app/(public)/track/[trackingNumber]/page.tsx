import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import TrackResult from '@/components/public/TrackResult';
import type { ShipmentWithEvents } from '@/types/database';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ trackingNumber: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { trackingNumber } = await params;
  return {
    title: `Tracking ${trackingNumber} — Global Express Shipments`,
  };
}

export default async function TrackResultPage({ params }: Props) {
  const { trackingNumber } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('shipments')
    .select('*, tracking_events(*)')
    .eq('tracking_number', trackingNumber.toUpperCase())
    .single();

  if (error || !data) {
    notFound();
  }

  return <TrackResult shipment={data as unknown as ShipmentWithEvents} />;
}

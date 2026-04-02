import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { createClient } from '@/lib/supabase/server';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/tracking';
import EventsManager from '@/components/admin/EventsManager';
import type { Metadata } from 'next';

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Tracking Events — Admin' };

export default async function EventsPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: shipmentData, error } = await supabase
    .from('shipments')
    .select('*, tracking_events(*)')
    .eq('id', id)
    .single();

  if (error || !shipmentData) notFound();

  const shipment = shipmentData as unknown as import('@/types/database').ShipmentWithEvents;
  const events = (shipment.tracking_events || []).sort(
    (a: { event_timestamp: string }, b: { event_timestamp: string }) =>
      new Date(b.event_timestamp).getTime() - new Date(a.event_timestamp).getTime()
  );

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/admin/shipments/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary transition-colors cursor-pointer mb-3"
        >
          <ArrowLeft size={14} />
          Back to Shipment
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <div>
            <h1 className="text-xl font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
              Tracking Events
            </h1>
            <p className="text-sm font-mono text-neutral-400 mt-0.5">{shipment.tracking_number}</p>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: STATUS_COLORS[shipment.status] }}
          >
            {STATUS_LABELS[shipment.status]}
          </span>
        </div>
      </div>

      <EventsManager shipmentId={id} initialEvents={events} />
    </div>
  );
}

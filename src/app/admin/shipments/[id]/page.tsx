import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ListChecks, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import { createClient } from '@/lib/supabase/server';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/tracking';
import ShipmentForm from '@/components/admin/ShipmentForm';
import DeleteShipmentButton from '@/components/admin/DeleteShipmentButton';
import type { Shipment } from '@/types/database';
import type { Metadata } from 'next';

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Edit Shipment — Admin' };

export default async function EditShipmentPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: shipmentData, error } = await supabase.from('shipments').select('*').eq('id', id).single();
  if (error || !shipmentData) notFound();
  const shipment = shipmentData as unknown as Shipment;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/shipments"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-foreground transition-colors cursor-pointer mb-3"
        >
          <ArrowLeft size={14} />
          Back to Shipments
        </Link>

        <div className="flex flex-wrap items-start gap-3">
          <div>
            <h1 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              Edit Shipment
            </h1>
            <p className="text-sm font-mono text-neutral-400 mt-0.5">{shipment.tracking_number}</p>
          </div>

          <span
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: STATUS_COLORS[shipment.status] }}
          >
            {STATUS_LABELS[shipment.status]}
          </span>

          <div className="ml-auto flex gap-2 flex-wrap">
            <Link
              href={`/admin/shipments/${id}/events`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <ListChecks size={14} />
              Manage Events
            </Link>
            <Link
              href={`/track/${shipment.tracking_number}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <ArrowSquareOut size={14} />
              Public View
            </Link>
            <DeleteShipmentButton shipmentId={id} trackingNumber={shipment.tracking_number} />
          </div>
        </div>
      </div>

      <ShipmentForm shipment={shipment} mode="edit" />
    </div>
  );
}

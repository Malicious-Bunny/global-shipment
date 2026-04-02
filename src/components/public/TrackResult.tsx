'use client';

import dynamic from 'next/dynamic';
import { Printer, Package, MapPin } from '@phosphor-icons/react';
import type { ShipmentWithEvents } from '@/types/database';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/tracking';
import MapWidget from '@/components/ui/MapWidget';

const Barcode = dynamic(() => import('react-barcode'), { ssr: false });

interface Props {
  shipment: ShipmentWithEvents;
}

function InfoRow({ label, value, accent }: { label: string; value: string | null; accent?: boolean }) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2 border-b border-neutral-100 last:border-0">
      <span className="w-32 shrink-0 text-xs font-medium text-neutral-400 uppercase tracking-wide pt-0.5">{label}</span>
      <span className={`text-sm ${accent ? 'font-semibold text-primary' : 'text-primary'}`}>{value}</span>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface rounded-xl border border-neutral-200 shadow-xs overflow-hidden mb-4">
      <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{title}</h3>
      </div>
      <div className="px-5 py-1">{children}</div>
    </div>
  );
}

export default function TrackResult({ shipment }: Props) {
  const statusColor = STATUS_COLORS[shipment.status] || '#71717a';
  const statusLabel = STATUS_LABELS[shipment.status] || shipment.status;

  const sortedEvents = [...(shipment.tracking_events || [])].sort(
    (a, b) => new Date(b.event_timestamp).getTime() - new Date(a.event_timestamp).getTime()
  );

  return (
    <div>
      {/* Banner */}
      <div className="bg-primary py-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Track Result
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">

        {/* Print button */}
        <div className="flex justify-end mb-5 no-print">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-surface px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
          >
            <Printer size={16} />
            Print Track Result
          </button>
        </div>

        {/* Barcode card */}
        <div className="bg-surface rounded-xl border border-neutral-200 shadow-xs mb-4 p-6 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 ring-1 ring-secondary/20">
              <Package size={22} weight="duotone" className="text-secondary" />
            </div>
            <div>
              <p className="font-semibold text-primary text-base leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                GLOBAL EXPRESS
              </p>
              <p className="text-[10px] text-neutral-400 tracking-[0.2em] uppercase">Shipments</p>
            </div>
          </div>
          <Barcode
            value={shipment.tracking_number}
            width={1.5}
            height={56}
            displayValue={false}
            background="#ffffff"
            lineColor="#111111"
          />
          <p className="mt-2 font-mono text-sm text-neutral-500">{shipment.tracking_number}</p>
        </div>

        {/* Shipper */}
        <SectionCard title="Shipper Information">
          <InfoRow label="Name"    value={shipment.shipper_name} />
          <InfoRow label="Address" value={shipment.shipper_address} />
          <InfoRow label="Phone"   value={shipment.shipper_phone} accent />
          <InfoRow label="Email"   value={shipment.shipper_email} />
        </SectionCard>

        {/* Receiver */}
        <SectionCard title="Receiver Information">
          <InfoRow label="Name"    value={shipment.receiver_name} />
          <InfoRow label="Address" value={shipment.receiver_address} />
          <InfoRow label="Phone"   value={shipment.receiver_phone} accent />
          <InfoRow label="Email"   value={shipment.receiver_email} />
        </SectionCard>

        {/* Package */}
        <SectionCard title="Package Details">
          <InfoRow label="Type"         value={shipment.package_type} />
          <InfoRow label="Weight"       value={shipment.weight ? `${shipment.weight} kg` : null} />
          <InfoRow label="Dimensions"   value={shipment.dimensions} />
          <InfoRow label="Origin"       value={shipment.origin} />
          <InfoRow label="Destination"  value={shipment.destination} />
          {shipment.estimated_delivery && (
            <InfoRow
              label="Est. Delivery"
              value={new Date(shipment.estimated_delivery).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            />
          )}
          {shipment.description && (
            <InfoRow label="Description" value={shipment.description} />
          )}
        </SectionCard>

        {/* Status banner */}
        <div
          className="rounded-xl px-5 py-4 text-center mb-4"
          style={{ backgroundColor: statusColor }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-white">
            Shipment Status: {statusLabel}
          </p>
        </div>

        {/* Live location map */}
        {shipment.current_lat != null && shipment.current_lng != null && (
          <div className="mb-4">
            <div className="mb-2 flex items-center gap-1.5">
              <MapPin size={14} className="text-secondary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Current Location</span>
            </div>
            <MapWidget lat={shipment.current_lat} lng={shipment.current_lng} className="h-64 w-full" />
          </div>
        )}

        {/* Timeline */}
        {sortedEvents.length > 0 ? (
          <div className="bg-surface rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Tracking History</h3>
            </div>
            <div className="divide-y divide-neutral-100">
              {sortedEvents.map((event, idx) => {
                const dotColor = idx === 0 ? '#FECE14' : (STATUS_COLORS[event.status] || '#a1a1aa');
                return (
                  <div key={event.id} className="flex gap-4 px-5 py-4">
                    {/* Timeline spine */}
                    <div className="flex flex-col items-center pt-1 shrink-0">
                      <div
                        className="h-2.5 w-2.5 rounded-full ring-2 ring-offset-1 ring-white shrink-0"
                        style={{ backgroundColor: dotColor }}
                      />
                      {idx < sortedEvents.length - 1 && (
                        <div className="mt-1 w-px flex-1 bg-neutral-200 min-h-6" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pb-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
                          style={{ backgroundColor: STATUS_COLORS[event.status] || '#71717a' }}
                        >
                          {STATUS_LABELS[event.status] || event.status}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {new Date(event.event_timestamp).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}{' '}
                          {new Date(event.event_timestamp).toLocaleTimeString('en-GB', {
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-primary font-medium">{event.description}</p>
                      {event.location && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin size={12} className="text-secondary shrink-0" />
                          <span className="text-xs text-neutral-400">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center">
            <Package size={32} className="mx-auto mb-3 text-neutral-300" weight="duotone" />
            <p className="text-sm text-neutral-500">No tracking events yet. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { Printer, MapPin, CheckCircle, Clock, Package, ArrowRight, Tag } from '@phosphor-icons/react';
import type { ShipmentWithEvents } from '@/types/database';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/tracking';
import MapWidget from '@/components/ui/MapWidget';
import Logo from '@/components/ui/Logo';

const Barcode = dynamic(() => import('react-barcode'), { ssr: false });

interface Props {
  shipment: ShipmentWithEvents;
}

// Map statuses to a step index for progress bar
const STATUS_STEPS = [
  'PENDING', 'PICKED_UP', 'IN_TRANSIT', 'CUSTOMS_CLEARANCE', 'OUT_FOR_DELIVERY', 'DELIVERED',
] as const;

const STEP_LABELS = ['Pending', 'Picked Up', 'In Transit', 'Customs', 'Out for Delivery', 'Delivered'];

function statusStep(status: string) {
  const idx = STATUS_STEPS.indexOf(status as typeof STATUS_STEPS[number]);
  return idx >= 0 ? idx : -1;
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-neutral-100 last:border-0 gap-4">
      <span className="text-xs text-neutral-400 uppercase tracking-wider shrink-0 pt-0.5">{label}</span>
      <span className="text-sm text-foreground font-medium text-right">{value}</span>
    </div>
  );
}

export default function TrackResult({ shipment }: Props) {
  const statusColor = STATUS_COLORS[shipment.status] || '#71717a';
  const statusLabel = STATUS_LABELS[shipment.status] || shipment.status;
  const step = statusStep(shipment.status);
  const isTerminal = shipment.status === 'DELIVERED' || shipment.status === 'CANCELLED' || shipment.status === 'ON_HOLD';

  const sortedEvents = [...(shipment.tracking_events || [])].sort(
    (a, b) => new Date(b.event_timestamp).getTime() - new Date(a.event_timestamp).getTime()
  );

  return (
    <div className="bg-background min-h-screen">

      {/* ── Page header ── */}
      <div className="bg-primary border-b border-white/10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 flex items-end justify-between gap-4">
          <div>
            <Logo height={28} className="brightness-0 invert mb-4" />
            <div className="flex items-center gap-2 mb-1">
              <span className="h-px w-6 bg-primary-foreground" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-primary-foreground font-medium">Track & Trace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{shipment.tracking_number}</h1>
          </div>
          <button
            onClick={() => window.print()}
            className="no-print hidden sm:inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-white/70 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
          >
            <Printer size={14} />
            Print
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-4">

        {/* ── Status + Progress bar ── */}
        <div className="rounded-2xl bg-card border border-neutral-200 shadow-xs overflow-hidden">
          {/* Coloured top accent */}
          <div className="h-1 w-full" style={{ backgroundColor: statusColor }} />

          <div className="px-6 py-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Current Status</p>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: statusColor }}
                  />
                  <span className="text-xl font-bold text-foreground">{statusLabel}</span>
                </div>
              </div>
              {shipment.estimated_delivery && (
                <div className="text-right">
                  <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Est. Delivery</p>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Clock size={14} className="text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">
                      {new Date(shipment.estimated_delivery).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Progress steps — only for standard statuses */}
            {step >= 0 && !isTerminal && (
              <div className="mt-5">
                <div className="flex items-center gap-0">
                  {STEP_LABELS.map((label, i) => {
                    const done = i < step;
                    const current = i === step;
                    return (
                      <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                        <div className="relative w-full flex items-center">
                          {/* Left connector */}
                          {i > 0 && (
                            <div className={`flex-1 h-0.5 ${done || current ? 'bg-primary' : 'bg-neutral-200'}`} />
                          )}
                          <div
                            className={`h-5 w-5 shrink-0 rounded-full flex items-center justify-center border-2 z-10 transition-colors duration-200 ${
                              done
                                ? 'bg-primary border-primary'
                                : current
                                ? 'bg-card border-primary'
                                : 'bg-card border-neutral-300'
                            }`}
                          >
                            {done && <CheckCircle size={12} weight="fill" className="text-primary-foreground" />}
                            {current && <div className="h-2 w-2 rounded-full bg-primary" />}
                          </div>
                          {/* Right connector */}
                          {i < STEP_LABELS.length - 1 && (
                            <div className={`flex-1 h-0.5 ${done ? 'bg-primary' : 'bg-neutral-200'}`} />
                          )}
                        </div>
                        <span className={`text-[9px] uppercase tracking-wide text-center leading-tight px-1 ${current ? 'font-bold text-foreground' : done ? 'text-muted-foreground' : 'text-neutral-400'}`}>
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Terminal status pill */}
            {isTerminal && (
              <div className="mt-4 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: statusColor }}>
                <span>{statusLabel}</span>
                {shipment.status === 'DELIVERED' && <CheckCircle size={16} weight="fill" />}
              </div>
            )}
          </div>
        </div>

        {/* ── Price + Barcode row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Barcode */}
          <div className="rounded-2xl bg-card border border-neutral-200 shadow-xs p-5 flex flex-col items-center justify-center">
            <Barcode
              value={shipment.tracking_number}
              width={1.4}
              height={52}
              displayValue={false}
              background="#ffffff"
              lineColor="#111111"
            />
            <p className="mt-2 font-mono text-xs text-neutral-400">{shipment.tracking_number}</p>
          </div>

          {/* Price + quick facts */}
          <div className="rounded-2xl bg-card border border-neutral-200 shadow-xs p-5 flex flex-col justify-between gap-4">
            {shipment.delivery_price != null ? (
              <div className="flex flex-col items-center justify-center flex-1 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
                  <Tag size={24} weight="duotone" className="text-muted-foreground" />
                </div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">Delivery Price</p>
                <p className="text-3xl font-bold text-foreground">
                  £{shipment.delivery_price.toFixed(2)}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-center text-neutral-300">
                <Package size={32} weight="duotone" className="mb-2" />
                <p className="text-xs uppercase tracking-wider">Price not set</p>
              </div>
            )}
            <div className="space-y-1.5 border-t border-neutral-100 pt-3">
              {shipment.package_type && (
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Type</span>
                  <span className="font-medium text-foreground">{shipment.package_type}</span>
                </div>
              )}
              {shipment.weight && (
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Weight</span>
                  <span className="font-medium text-foreground">{shipment.weight} kg</span>
                </div>
              )}
              {shipment.origin && shipment.destination && (
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 pt-1">
                  <span className="font-medium text-foreground truncate max-w-[80px]">{shipment.origin}</span>
                  <ArrowRight size={11} className="text-muted-foreground shrink-0" />
                  <span className="font-medium text-foreground truncate max-w-[80px]">{shipment.destination}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Shipper / Receiver ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-card border border-neutral-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3 border-b border-neutral-100 bg-muted">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Shipper</p>
            </div>
            <div className="px-5 py-1">
              <InfoRow label="Name"    value={shipment.shipper_name} />
              <InfoRow label="Address" value={shipment.shipper_address} />
              <InfoRow label="Phone"   value={shipment.shipper_phone} />
              <InfoRow label="Email"   value={shipment.shipper_email} />
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-neutral-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3 border-b border-neutral-100 bg-muted">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Receiver</p>
            </div>
            <div className="px-5 py-1">
              <InfoRow label="Name"    value={shipment.receiver_name} />
              <InfoRow label="Address" value={shipment.receiver_address} />
              <InfoRow label="Phone"   value={shipment.receiver_phone} />
              <InfoRow label="Email"   value={shipment.receiver_email} />
            </div>
          </div>
        </div>

        {/* ── Package details ── */}
        {shipment.description && (
          <div className="rounded-2xl bg-card border border-neutral-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3 border-b border-neutral-100 bg-muted">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Package Details</p>
            </div>
            <div className="px-5 py-1">
              <InfoRow label="Contents" value={shipment.description} />
              {shipment.dimensions && <InfoRow label="Dimensions" value={shipment.dimensions} />}
            </div>
          </div>
        )}

        {/* ── Live map ── */}
        {shipment.current_lat != null && shipment.current_lng != null && (
          <div className="rounded-2xl bg-card border border-neutral-200 shadow-xs overflow-hidden">
            <div className="px-5 py-3 border-b border-neutral-100 bg-muted flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Live Package Location</p>
            </div>
            <div className="h-64 w-full">
              <MapWidget
                lat={shipment.current_lat}
                lng={shipment.current_lng}
                className="h-full w-full rounded-none border-0"
              />
            </div>
          </div>
        )}

        {/* ── Timeline ── */}
        <div className="rounded-2xl bg-card border border-neutral-200 shadow-xs overflow-hidden">
          <div className="px-5 py-3 border-b border-neutral-100 bg-muted">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Tracking History</p>
          </div>

          {sortedEvents.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <Package size={28} className="mx-auto mb-2 text-neutral-300" weight="duotone" />
              <p className="text-sm text-neutral-400">No tracking events yet.</p>
            </div>
          ) : (
            <div className="px-5 py-4 space-y-0">
              {sortedEvents.map((event, idx) => {
                const dotColor = idx === 0 ? '#FECE14' : (STATUS_COLORS[event.status] || '#a1a1aa');
                const isFirst = idx === 0;
                return (
                  <div key={event.id} className={`flex gap-4 pb-5 relative ${isFirst ? 'opacity-100' : 'opacity-70'}`}>
                    {/* Spine */}
                    <div className="flex flex-col items-center shrink-0 w-4">
                      <div
                        className="h-3 w-3 rounded-full shrink-0 mt-0.5 ring-2 ring-white ring-offset-1"
                        style={{ backgroundColor: dotColor }}
                      />
                      {idx < sortedEvents.length - 1 && (
                        <div className="w-px flex-1 bg-neutral-150 mt-1.5" style={{ background: 'repeating-linear-gradient(to bottom, #e5e7eb 0, #e5e7eb 4px, transparent 4px, transparent 8px)' }} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pb-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide"
                          style={{ backgroundColor: STATUS_COLORS[event.status] || '#71717a' }}
                        >
                          {STATUS_LABELS[event.status] || event.status}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          {new Date(event.event_timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          {' · '}
                          {new Date(event.event_timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground font-medium">{event.description}</p>
                      {event.location && (
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin size={11} className="text-muted-foreground shrink-0" />
                          <span className="text-xs text-neutral-400">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-neutral-400 pb-4">
          Global Express Shipments · Tracking #{shipment.tracking_number}
        </p>

      </div>
    </div>
  );
}

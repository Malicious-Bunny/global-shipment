'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash, MapPin, WarningCircle, CircleNotch } from '@phosphor-icons/react';
import { trackingEventSchema, type TrackingEventFormData } from '@/lib/validations';
import { ALL_STATUSES, STATUS_LABELS, STATUS_COLORS } from '@/lib/tracking';
import type { TrackingEvent } from '@/types/database';
import { cn } from '@/lib/utils';

/* ── Shared primitives ────────────────────────────────────── */
function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-neutral-600 mb-1.5">
      {children}{required && <span className="ml-0.5 text-danger">*</span>}
    </label>
  );
}

function Input({ error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-primary placeholder:text-neutral-400 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary',
        error ? 'border-danger/60 bg-danger/5' : 'border-neutral-200 hover:border-neutral-300',
      )}
    />
  );
}

/* ── Component ───────────────────────────────────────────── */
interface Props {
  shipmentId: string;
  initialEvents: TrackingEvent[];
}

export default function EventsManager({ shipmentId, initialEvents }: Props) {
  const [events, setEvents] = useState<TrackingEvent[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const now = new Date();
  const localIso = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<TrackingEventFormData>({
    resolver: zodResolver(trackingEventSchema),
    defaultValues: { status: 'IN_TRANSIT', location: '', description: '', event_timestamp: localIso },
  });

  const onSubmit = async (data: TrackingEventFormData) => {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/admin/shipments/${shipmentId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) { setError(json.error || 'Failed to add event'); setLoading(false); return; }
    setEvents((prev) => [json, ...prev]);
    reset({ status: 'IN_TRANSIT', location: '', description: '', event_timestamp: localIso });
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);
    const res = await fetch(`/api/admin/shipments/${shipmentId}/events/${deleteId}`, { method: 'DELETE' });
    if (res.ok) { setEvents((prev) => prev.filter((e) => e.id !== deleteId)); router.refresh(); }
    setDeleteId(null);
    setDeleteLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Add Event Form */}
      <div className="bg-surface rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50 flex items-center gap-2">
          <Plus size={15} weight="bold" className="text-neutral-500" />
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Add Tracking Event</h3>
        </div>
        <div className="p-5">
          {error && (
            <div className="mb-4 flex items-center gap-2.5 rounded-lg border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
              <WarningCircle size={14} weight="fill" className="shrink-0" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label htmlFor="ev-status" required>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="ev-status"
                      {...field}
                      className={cn(
                        'w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-primary appearance-none transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary',
                        errors.status ? 'border-danger/60 bg-danger/5' : 'border-neutral-200 hover:border-neutral-300',
                      )}
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="ev-location">Location</Label>
                <Input id="ev-location" {...register('location')} placeholder="e.g. London Heathrow, UK" />
              </div>

              <div>
                <Label htmlFor="ev-timestamp" required>Date & Time</Label>
                <Input
                  id="ev-timestamp"
                  type="datetime-local"
                  {...register('event_timestamp')}
                  error={!!errors.event_timestamp}
                />
              </div>

              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg bg-secondary px-5 text-sm font-semibold text-primary hover:bg-secondary/85 disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {loading ? <CircleNotch size={16} className="animate-spin" /> : <Plus size={15} weight="bold" />}
                  Add Event
                </button>
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <Label htmlFor="ev-description" required>Description</Label>
                <Input
                  id="ev-description"
                  {...register('description')}
                  error={!!errors.description}
                  placeholder="e.g. Shipment arrived at sorting facility"
                />
                {errors.description && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-danger">
                    <WarningCircle size={12} weight="fill" />
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-surface rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-neutral-100 bg-neutral-50">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Tracking History
            <span className="ml-2 rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
              {events.length}
            </span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50 text-left">
                {['Date & Time', 'Status', 'Location', 'Description', ''].map((col) => (
                  <th key={col} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-neutral-400 font-mono">
                    {new Date(event.event_timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {' '}
                    {new Date(event.event_timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white"
                      style={{ backgroundColor: STATUS_COLORS[event.status] || '#71717a' }}
                    >
                      {STATUS_LABELS[event.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {event.location ? (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-neutral-400 shrink-0" />
                        <span className="text-sm text-neutral-600">{event.location}</span>
                      </div>
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700">{event.description}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDeleteId(event.id)}
                      className="rounded-lg p-1.5 text-neutral-400 hover:bg-danger/8 hover:text-danger transition-colors cursor-pointer"
                      aria-label="Delete event"
                    >
                      <Trash size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-neutral-400">
                    No events yet. Add the first one above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirm Dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteId(null)} aria-hidden="true" />
          <div className="relative bg-surface rounded-xl border border-neutral-200 shadow-xl max-w-sm w-full p-6">
            <h3 className="text-base font-semibold text-primary mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Delete Event
            </h3>
            <p className="text-sm text-neutral-500 mb-6">
              Are you sure you want to delete this tracking event? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleteLoading}
                className="rounded-lg border border-neutral-200 bg-surface px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="inline-flex items-center gap-2 rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white hover:bg-danger/90 disabled:opacity-60 transition-colors cursor-pointer"
              >
                {deleteLoading && <CircleNotch size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

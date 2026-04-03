'use client';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { WarningCircle, CircleNotch, MapPin } from '@phosphor-icons/react';
import { shipmentSchema, type ShipmentFormData } from '@/lib/validations';
import { ALL_STATUSES, STATUS_LABELS } from '@/lib/tracking';
import type { Shipment } from '@/types/database';
import { cn } from '@/lib/utils';

// Leaflet requires browser APIs — must be client-only
const MapPicker = dynamic(() => import('@/components/admin/MapPicker'), { ssr: false });

/* ── Shared field components ────────────────────────────────── */
function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-neutral-600 mb-1.5">
      {children}{required && <span className="ml-0.5 text-danger">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-danger">
      <WarningCircle size={12} weight="fill" />
      {message}
    </p>
  );
}

function Input({ error, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-primary placeholder:text-neutral-400 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary',
        error ? 'border-danger/60 bg-danger/5' : 'border-neutral-200 hover:border-neutral-300',
        className,
      )}
    />
  );
}

function Textarea({ error, className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-primary placeholder:text-neutral-400 transition-colors resize-none',
        'focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary',
        error ? 'border-danger/60 bg-danger/5' : 'border-neutral-200 hover:border-neutral-300',
        className,
      )}
    />
  );
}

function SelectField({ error, children, className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select
      {...props}
      className={cn(
        'w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-primary transition-colors appearance-none',
        'focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary',
        error ? 'border-danger/60 bg-danger/5' : 'border-neutral-200 hover:border-neutral-300',
        className,
      )}
    >
      {children}
    </select>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-surface rounded-xl border border-neutral-200 shadow-xs overflow-hidden mb-4">
      <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ── Component ───────────────────────────────────────────────── */
interface Props {
  shipment?: Shipment;
  mode: 'create' | 'edit';
}

export default function ShipmentForm({ shipment, mode }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<ShipmentFormData>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      shipper_name:      shipment?.shipper_name      || '',
      shipper_address:   shipment?.shipper_address   || '',
      shipper_phone:     shipment?.shipper_phone     || '',
      shipper_email:     shipment?.shipper_email     || '',
      receiver_name:     shipment?.receiver_name     || '',
      receiver_address:  shipment?.receiver_address  || '',
      receiver_phone:    shipment?.receiver_phone    || '',
      receiver_email:    shipment?.receiver_email    || '',
      package_type:      shipment?.package_type      || 'PARCEL',
      weight:            shipment?.weight            ?? undefined,
      dimensions:        shipment?.dimensions        || '',
      description:       shipment?.description       || '',
      origin:            shipment?.origin            || '',
      destination:       shipment?.destination       || '',
      estimated_delivery: shipment?.estimated_delivery || '',
      status:            shipment?.status            || 'PENDING',
      current_lat:       shipment?.current_lat       ?? undefined,
      current_lng:       shipment?.current_lng       ?? undefined,
      delivery_price:    shipment?.delivery_price    ?? undefined,
    },
  });

  const watchedLat = useWatch({ control, name: 'current_lat' });
  const watchedLng = useWatch({ control, name: 'current_lng' });
  const hasMap =
    typeof watchedLat === 'number' && !isNaN(watchedLat) &&
    typeof watchedLng === 'number' && !isNaN(watchedLng);

  const onSubmit = async (data: ShipmentFormData) => {
    setLoading(true);
    setServerError(null);
    const url = mode === 'create' ? '/api/admin/shipments' : `/api/admin/shipments/${shipment!.id}`;
    const method = mode === 'create' ? 'POST' : 'PUT';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const json = await res.json();
    if (!res.ok) { setServerError(json.error || 'Something went wrong'); setLoading(false); return; }
    setLoading(false);
    router.push(`/admin/shipments/${json.id}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {serverError && (
        <div className="mb-4 flex items-center gap-2.5 rounded-lg border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
          <WarningCircle size={16} weight="fill" className="shrink-0" />
          {serverError}
        </div>
      )}

      {/* Shipper */}
      <FormSection title="Shipper Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="shipper_name" required>Full Name</Label>
            <Input id="shipper_name" {...register('shipper_name')} error={!!errors.shipper_name} placeholder="John Smith" />
            <FieldError message={errors.shipper_name?.message} />
          </div>
          <div>
            <Label htmlFor="shipper_phone">Phone</Label>
            <Input id="shipper_phone" {...register('shipper_phone')} placeholder="+44 20 7946 0123" />
          </div>
          <div>
            <Label htmlFor="shipper_email">Email</Label>
            <Input id="shipper_email" type="email" {...register('shipper_email')} error={!!errors.shipper_email} placeholder="john@example.com" />
            <FieldError message={errors.shipper_email?.message} />
          </div>
          <div>
            <Label htmlFor="shipper_address" required>Address</Label>
            <Input id="shipper_address" {...register('shipper_address')} error={!!errors.shipper_address} placeholder="123 Main St, London" />
            <FieldError message={errors.shipper_address?.message} />
          </div>
        </div>
      </FormSection>

      {/* Receiver */}
      <FormSection title="Receiver Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="receiver_name" required>Full Name</Label>
            <Input id="receiver_name" {...register('receiver_name')} error={!!errors.receiver_name} placeholder="Jane Doe" />
            <FieldError message={errors.receiver_name?.message} />
          </div>
          <div>
            <Label htmlFor="receiver_phone">Phone</Label>
            <Input id="receiver_phone" {...register('receiver_phone')} placeholder="+1 212 555 0100" />
          </div>
          <div>
            <Label htmlFor="receiver_email">Email</Label>
            <Input id="receiver_email" type="email" {...register('receiver_email')} error={!!errors.receiver_email} placeholder="jane@example.com" />
            <FieldError message={errors.receiver_email?.message} />
          </div>
          <div>
            <Label htmlFor="receiver_address" required>Address</Label>
            <Input id="receiver_address" {...register('receiver_address')} error={!!errors.receiver_address} placeholder="456 Oak Ave, New York" />
            <FieldError message={errors.receiver_address?.message} />
          </div>
        </div>
      </FormSection>

      {/* Package & Route */}
      <FormSection title="Package & Route Details">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="package_type" required>Package Type</Label>
            <Controller
              name="package_type"
              control={control}
              render={({ field }) => (
                <SelectField id="package_type" {...field} error={!!errors.package_type}>
                  <option value="DOCUMENT">Document</option>
                  <option value="PARCEL">Parcel</option>
                  <option value="FREIGHT">Freight</option>
                  <option value="VEHICLE">Vehicle</option>
                </SelectField>
              )}
            />
            <FieldError message={errors.package_type?.message} />
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" step="0.01" min="0" {...register('weight', { valueAsNumber: true })} placeholder="0.00" />
          </div>
          <div>
            <Label htmlFor="delivery_price">Delivery Price (£)</Label>
            <Input id="delivery_price" type="number" step="0.01" min="0" {...register('delivery_price', { valueAsNumber: true })} placeholder="0.00" />
          </div>
          <div>
            <Label htmlFor="dimensions">Dimensions (L×W×H cm)</Label>
            <Input id="dimensions" {...register('dimensions')} placeholder="30×20×15" />
          </div>
          <div>
            <Label htmlFor="estimated_delivery">Est. Delivery Date</Label>
            <Input id="estimated_delivery" type="date" {...register('estimated_delivery')} />
          </div>
          <div>
            <Label htmlFor="origin">Origin</Label>
            <Input id="origin" {...register('origin')} placeholder="London, UK" />
          </div>
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input id="destination" {...register('destination')} placeholder="New York, USA" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="description">Contents Description</Label>
            <Textarea id="description" {...register('description')} rows={2} placeholder="General description of shipment contents" />
          </div>
        </div>
      </FormSection>

      {/* Status */}
      <FormSection title="Shipment Status">
        <div className="max-w-xs">
          <Label htmlFor="status" required>Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <SelectField id="status" {...field} error={!!errors.status}>
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </SelectField>
            )}
          />
        </div>
      </FormSection>

      {/* Location Pin */}
      <FormSection title="Package Location (Map Pin)">
        <p className="text-xs text-neutral-400 mb-3 flex items-center gap-1.5">
          <MapPin size={12} />
          Click the map to place a pin. Customers will see this location on their tracking page.
        </p>
        <MapPicker
          lat={watchedLat as number | null}
          lng={watchedLng as number | null}
          onChange={(lat, lng) => {
            setValue('current_lat', lat, { shouldDirty: true });
            setValue('current_lng', lng, { shouldDirty: true });
          }}
        />
        {hasMap && (
          <button
            type="button"
            onClick={() => {
              setValue('current_lat', null, { shouldDirty: true });
              setValue('current_lng', null, { shouldDirty: true });
            }}
            className="mt-2 text-xs text-neutral-400 hover:text-danger transition-colors cursor-pointer"
          >
            Clear pin
          </button>
        )}
      </FormSection>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-secondary/85 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {loading && <CircleNotch size={16} className="animate-spin" />}
          {mode === 'create' ? 'Create Shipment' : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={loading}
          className="inline-flex items-center rounded-lg border border-neutral-200 bg-surface px-6 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 disabled:opacity-60 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

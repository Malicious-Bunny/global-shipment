'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash, WarningCircle, CircleNotch } from '@phosphor-icons/react';

interface Props {
  shipmentId: string;
  trackingNumber: string;
}

export default function DeleteShipmentButton({ shipmentId, trackingNumber }: Props) {
  const [open, setOpen]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/admin/shipments/${shipmentId}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/admin/shipments');
      router.refresh();
    } else {
      const json = await res.json().catch(() => ({}));
      setError(json.error || 'Failed to delete shipment.');
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-danger/30 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger/5 transition-colors cursor-pointer"
      >
        <Trash size={13} />
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !loading && setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-surface rounded-xl border border-neutral-200 shadow-xl max-w-sm w-full p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger/10 mb-4">
              <Trash size={18} className="text-danger" />
            </div>
            <h3 className="text-base font-semibold text-primary mb-1" style={{ fontFamily: 'var(--font-display)' }}>
              Delete Shipment
            </h3>
            <p className="text-sm text-neutral-500 mb-1">
              Are you sure you want to delete <span className="font-mono font-semibold text-primary">{trackingNumber}</span>?
            </p>
            <p className="text-xs text-neutral-400 mb-5">
              This will permanently remove the shipment and all its tracking events.
            </p>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-danger/20 bg-danger/5 px-3 py-2.5 text-xs text-danger">
                <WarningCircle size={13} weight="fill" className="shrink-0" />
                {error}
              </div>
            )}

            <div className="flex gap-2.5 justify-end">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-white hover:bg-danger/90 disabled:opacity-60 transition-colors cursor-pointer"
              >
                {loading && <CircleNotch size={14} className="animate-spin" />}
                Delete Shipment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

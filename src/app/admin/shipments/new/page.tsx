import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import ShipmentForm from '@/components/admin/ShipmentForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'New Shipment — Admin' };

export default function NewShipmentPage() {
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
        <h1 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
          Create New Shipment
        </h1>
        <p className="text-sm text-neutral-500 mt-0.5">A tracking number will be generated automatically</p>
      </div>
      <ShipmentForm mode="create" />
    </div>
  );
}

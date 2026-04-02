import Link from 'next/link';
import { Plus } from '@phosphor-icons/react/dist/ssr';
import { createClient } from '@/lib/supabase/server';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/tracking';
import type { Shipment } from '@/types/database';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shipments — Admin' };

export default async function ShipmentsPage() {
  const supabase = await createClient();
  const { data: shipmentsData } = await supabase
    .from('shipments')
    .select('*')
    .order('created_at', { ascending: false });

  const all = (shipmentsData || []) as Shipment[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>Shipments</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {all.length} total shipment{all.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/admin/shipments/new"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary/85 transition-colors cursor-pointer"
        >
          <Plus size={15} weight="bold" />
          New Shipment
        </Link>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-surface shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                {['Tracking Number', 'Shipper', 'Receiver', 'Type', 'Route', 'Status', 'Created', 'Actions'].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {all.map((s: Shipment) => (
                <tr key={s.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-primary whitespace-nowrap">
                    {s.tracking_number}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700">{s.shipper_name}</td>
                  <td className="px-4 py-3 text-sm text-neutral-700">{s.receiver_name}</td>
                  <td className="px-4 py-3 text-xs text-neutral-500">{s.package_type}</td>
                  <td className="px-4 py-3 text-xs text-neutral-500 whitespace-nowrap">
                    {s.origin || '—'} → {s.destination || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white whitespace-nowrap"
                      style={{ backgroundColor: STATUS_COLORS[s.status] }}
                    >
                      {STATUS_LABELS[s.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-400 whitespace-nowrap">
                    {new Date(s.created_at).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/shipments/${s.id}`}
                        className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 transition-colors cursor-pointer"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/admin/shipments/${s.id}/events`}
                        className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 transition-colors cursor-pointer"
                      >
                        Events
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {all.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-14 text-center text-sm text-neutral-400">
                    No shipments yet.{' '}
                    <Link href="/admin/shipments/new" className="font-medium text-primary underline hover:no-underline">
                      Create the first one
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

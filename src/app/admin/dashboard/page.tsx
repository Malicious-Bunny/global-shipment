import Link from 'next/link';
import { Package, CheckCircle, Hourglass, Warning, Plus } from '@phosphor-icons/react/dist/ssr';
import { createClient } from '@/lib/supabase/server';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/tracking';
import type { Shipment } from '@/types/database';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard — Admin' };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: shipmentsData } = await supabase
    .from('shipments')
    .select('*')
    .order('created_at', { ascending: false });

  const all = (shipmentsData || []) as Shipment[];
  const total     = all.length;
  const delivered = all.filter((s) => s.status === 'DELIVERED').length;
  const inTransit = all.filter((s) => ['IN_TRANSIT', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'CUSTOMS_CLEARANCE'].includes(s.status)).length;
  const pending   = all.filter((s) => ['PENDING', 'ON_HOLD'].includes(s.status)).length;
  const recent    = all.slice(0, 8);

  const stats = [
    { label: 'Total Shipments',   value: total,     Icon: Package,     color: 'text-primary',       bg: 'bg-neutral-100'   },
    { label: 'Delivered',         value: delivered,  Icon: CheckCircle, color: 'text-success',       bg: 'bg-success/10'    },
    { label: 'In Transit',        value: inTransit,  Icon: Hourglass,   color: 'text-blue-600',      bg: 'bg-blue-50'       },
    { label: 'Pending / On Hold', value: pending,    Icon: Warning,     color: 'text-warning',       bg: 'bg-warning/10'    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>Dashboard</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Overview of all shipments</p>
        </div>
        <Link
          href="/admin/shipments/new"
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary/85 transition-colors cursor-pointer"
        >
          <Plus size={15} weight="bold" />
          New Shipment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-6">
        {stats.map(({ label, value, Icon, color, bg }) => (
          <div key={label} className="rounded-xl border border-neutral-200 bg-surface p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">{label}</span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
                <Icon size={16} weight="duotone" className={color} />
              </div>
            </div>
            <p className={`text-3xl font-semibold ${color}`} style={{ fontFamily: 'var(--font-display)' }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent shipments */}
      <div className="rounded-xl border border-neutral-200 bg-surface shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-100 bg-neutral-50">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Recent Shipments</h2>
          <Link href="/admin/shipments" className="text-xs font-semibold text-neutral-500 hover:text-primary transition-colors cursor-pointer">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100">
                {['Tracking No.', 'Shipper', 'Receiver', 'Destination', 'Status', 'Date', ''].map((col) => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recent.map((s: Shipment) => (
                <tr key={s.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-primary whitespace-nowrap">
                    {s.tracking_number}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-700">{s.shipper_name}</td>
                  <td className="px-4 py-3 text-sm text-neutral-700">{s.receiver_name}</td>
                  <td className="px-4 py-3 text-sm text-neutral-500">{s.destination || '—'}</td>
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
                    <Link
                      href={`/admin/shipments/${s.id}`}
                      className="text-xs font-semibold text-neutral-500 hover:text-primary transition-colors cursor-pointer"
                    >
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-neutral-400">
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

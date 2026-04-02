'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = trackingNumber.trim().toUpperCase();
    if (trimmed) router.push(`/track/${trimmed}`);
  };

  return (
    <>
      <div className="bg-neutral-50 border-b border-neutral-200 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-1 w-10 bg-secondary rounded-full mb-5" />
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            Track & Trace
          </h1>
          <p className="mt-2 text-neutral-500">Real-time updates on your shipment status</p>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 sm:px-6 py-16">
        <div className="rounded-xl border border-neutral-200 bg-surface shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-primary mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Enter Tracking Number
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            Your tracking number was provided at the time of shipment booking.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. GES051828334831272262"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              autoComplete="off"
              className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-primary placeholder:text-neutral-400 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary/85 transition-colors cursor-pointer whitespace-nowrap"
            >
              <MagnifyingGlass size={16} weight="bold" />
              Track
            </button>
          </form>
          <p className="mt-3 text-center text-xs text-neutral-400">
            Tracking numbers start with GES followed by 18 digits
          </p>
        </div>
      </div>
    </>
  );
}

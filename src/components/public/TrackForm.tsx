'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function TrackForm() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = trackingNumber.trim().toUpperCase();
    if (trimmed) router.push(`/track/${trimmed}`);
  };

  return (
    <div className="bg-muted border-y border-neutral-200 py-10">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="bg-background rounded-xl border border-neutral-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Track Your Shipment
          </h2>
          <p className="text-sm text-neutral-500 mb-5">
            Enter your tracking number to get real-time updates
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. GES051828334831272262"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1 rounded-lg border border-neutral-200 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              autoComplete="off"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/85 transition-colors duration-150 cursor-pointer whitespace-nowrap"
            >
              <MagnifyingGlass size={16} weight="bold" />
              Track Now
            </button>
          </form>
          <p className="mt-3 text-xs text-neutral-400 text-center">
            Tracking numbers start with GES followed by 18 digits
          </p>
        </div>
      </div>
    </div>
  );
}

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
      <div className="bg-background border-b border-border py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-1 w-10 bg-primary rounded-full mb-5" />
          <h1 className="text-4xl sm:text-5xl font-light text-foreground">Track & Trace</h1>
          <p className="mt-2 text-muted-foreground">Real-time updates on your shipment status</p>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 sm:px-6 py-16">
        <div className="rounded-xl border border-border bg-card shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-light text-foreground mb-1">Enter Tracking Number</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Your tracking number was provided at the time of shipment booking.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. GES051828334831272262"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              autoComplete="off"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/85 transition-colors cursor-pointer whitespace-nowrap"
            >
              <MagnifyingGlass size={16} weight="bold" />
              Track
            </button>
          </form>
          <p className="mt-3 text-center text-xs text-muted-foreground/60">
            Tracking numbers start with GES followed by 18 digits
          </p>
        </div>
      </div>
    </>
  );
}

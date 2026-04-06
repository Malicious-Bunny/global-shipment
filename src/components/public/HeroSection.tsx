'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MagnifyingGlass, Truck, AirplaneTilt, Boat } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const pills = [
  { Icon: Truck,         label: 'Road Freight' },
  { Icon: AirplaneTilt,  label: 'Air Freight'  },
  { Icon: Boat,          label: 'Ocean Freight' },
];

export default function HeroSection() {
  const [query, setQuery]     = useState('');
  const [focused, setFocused] = useState(false);
  const router                = useRouter();

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim().toUpperCase();
    if (q) router.push(`/track/${q}`);
  }

  return (
    <section className="flex min-h-[88vh] overflow-hidden">

      {/* ── Left panel: dark navy content ── */}
      <div className="relative flex flex-1 flex-col justify-center bg-navy px-6 sm:px-10 lg:px-16 py-20 lg:max-w-[55%]">

        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 max-w-xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-7">
            <span className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
              Worldwide Logistics & Courier
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-black text-white leading-[1.05] tracking-[-0.03em] mb-3"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}>
            Global Express<br />
            <span className="text-primary-foreground">Shipments</span>
          </h1>

          <p className="text-sm text-white/60 font-semibold uppercase tracking-widest mb-4">
            Crafting Your Logistics Online
          </p>

          <p className="text-base text-white/70 max-w-sm leading-relaxed mb-8">
            Seamless shipping solutions for businesses and individuals — road, air, and ocean freight with full real-time tracking.
          </p>

          {/* Service pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {pills.map(({ Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 bg-white/8 border border-white/15 rounded-full px-3.5 py-1.5 text-xs font-medium text-white/75"
              >
                <Icon size={13} weight="duotone" className="text-white/70" />
                {label}
              </span>
            ))}
          </div>

          {/* Track form */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55 mb-2">
              Track My Shipment
            </p>
            <form
              onSubmit={handleTrack}
              className={cn(
                'flex items-center rounded-xl overflow-hidden border bg-card transition-all duration-200',
                focused
                  ? 'border-primary shadow-[0_0_0_3px_oklch(0.8545_0.1675_159.6564/0.25)]'
                  : 'border-white/10'
              )}
            >
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Booking or Container no."
                autoComplete="off"
                className="flex-1 bg-transparent px-4 py-3.5 text-sm text-foreground placeholder:text-neutral-400 focus:outline-none min-w-0"
              />
              <button
                type="submit"
                className="flex items-center gap-2 bg-primary hover:bg-primary/85 px-5 py-3.5 text-sm font-bold text-primary-foreground transition-colors shrink-0 cursor-pointer whitespace-nowrap"
              >
                <MagnifyingGlass size={15} weight="bold" />
                <span className="hidden sm:inline">Track Shipment Now</span>
                <span className="sm:hidden">Track</span>
              </button>
            </form>
          </div>

          {/* Stats row */}
          <div className="mt-10 flex items-center gap-8 border-t border-white/10 pt-8">
            {[
              { value: '32K+',  label: 'Deliveries'    },
              { value: '98%',   label: 'On-Time Rate'  },
              { value: '150+',  label: 'Countries'     },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-white tracking-tight leading-none">{value}</p>
                <p className="text-[10px] text-white/55 font-medium uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel: container image ── */}
      <div className="relative hidden lg:block flex-1">
        <Image
          src="/images/hero-container-globe.jpg"
          alt="GES shipping containers — worldwide logistics"
          fill
          priority
          className="object-cover object-center"
          sizes="45vw"
        />
        {/* Gradient fade from left for seamless blend */}
        <div className="absolute inset-0 bg-linear-to-r from-navy via-navy/10 to-transparent" />

        {/* Floating card */}
        <div className="absolute bottom-10 right-8 bg-card rounded-2xl px-5 py-4 shadow-2xl">
          <p className="text-3xl font-black text-foreground tracking-tight leading-none">98%</p>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mt-1">On-Time Delivery</p>
        </div>

        {/* Second floating card */}
        <div className="absolute top-10 right-8 bg-primary rounded-2xl px-5 py-4 shadow-2xl">
          <p className="text-3xl font-black text-primary-foreground tracking-tight leading-none">32K+</p>
          <p className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider mt-1">Successful Deliveries</p>
        </div>
      </div>

    </section>
  );
}

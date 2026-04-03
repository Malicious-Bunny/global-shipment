'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, MagnifyingGlass, AirplaneTilt, Boat, Truck, Train } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const slides = [
  {
    image: '/images/hero-container-globe.jpg',
    imageAlt: 'Global Express Shipments containers',
  },
  {
    image: '/images/fleet-vehicles.jpg',
    imageAlt: 'Global Express Shipments fleet of vehicles',
  },
  {
    image: '/images/hero-truck.jpg',
    imageAlt: 'Global Express Shipments delivery truck',
  },
];

const modes = [
  { Icon: AirplaneTilt, label: 'Air' },
  { Icon: Boat,         label: 'Sea' },
  { Icon: Truck,        label: 'Road' },
  { Icon: Train,        label: 'Rail' },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const busy = useRef(false);

  const goTo = useCallback((idx: number) => {
    if (idx === active || busy.current) return;
    busy.current = true;
    setTimeout(() => {
      setActive(idx);
      busy.current = false;
    }, 50);
  }, [active]);

  useEffect(() => {
    const id = setInterval(() => goTo((active + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [active, goTo]);

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim().toUpperCase();
    if (q) router.push(`/track/${q}`);
  }

  return (
    <section className="relative min-h-[88vh] flex flex-col overflow-hidden">

      {/* ── Background images ── */}
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            i === active ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={s.image}
            alt={s.imageAlt}
            fill
            priority={i === 0}
            className="object-cover object-center scale-105"
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── Overlays ── */}
      {/* Bottom-up dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 z-[1]" />
      {/* Left vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-[1]" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-1 flex-col justify-end pb-16 pt-32">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">

            {/* Left — headline */}
            <div>
              {/* Mode badges */}
              <div className="flex items-center gap-2 mb-8">
                {modes.map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1">
                    <Icon size={12} weight="bold" className="text-secondary" />
                    <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
                Shipped.<br />
                <span className="text-secondary">Tracked.</span><br />
                Delivered.
              </h1>

              <p className="mt-6 text-base text-white/70 max-w-sm leading-relaxed">
                Fast, reliable logistics across air, sea, road and rail — to over 150 countries worldwide.
              </p>

              <div className="mt-8 flex items-center gap-3 flex-wrap">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-primary hover:bg-secondary/85 transition-colors duration-150 cursor-pointer"
                >
                  Our Services <ArrowRight size={15} weight="bold" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors duration-150 cursor-pointer"
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            {/* Right — track card */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary mb-1">Real-Time Tracking</p>
              <h2 className="text-xl font-bold text-white mb-5">Track your shipment</h2>
              <form onSubmit={handleTrack} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Enter tracking number (e.g. GES0518…)"
                  autoComplete="off"
                  className="w-full rounded-xl border border-white/25 bg-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-bold text-primary hover:bg-secondary/85 transition-colors duration-150 cursor-pointer"
                >
                  <MagnifyingGlass size={16} weight="bold" />
                  Track Now
                </button>
              </form>
              <p className="mt-3 text-xs text-white/40 text-center">
                Tracking numbers begin with GES
              </p>

              {/* Divider */}
              <div className="my-5 border-t border-white/10" />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '150+', label: 'Countries' },
                  { value: '98%',  label: 'On-Time' },
                  { value: '24/7', label: 'Support' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-lg font-black text-white leading-none">{value}</p>
                    <p className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={cn(
              'rounded-full transition-all duration-500 cursor-pointer',
              i === active
                ? 'w-6 h-1.5 bg-secondary'
                : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
            )}
          />
        ))}
      </div>

    </section>
  );
}

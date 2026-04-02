'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Lightning, Package, Crosshair } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const slides = [
  {
    line1: 'Delivering Around',
    line2: 'The World',
    sub: 'Secure handling and reliable delivery to every corner of the globe.',
    cta: 'Track Your Shipment',
    href: '/track',
    image: '/images/hero-container-globe.jpg',
    imageAlt: 'Global Express Shipments container with logo',
  },
  {
    line1: 'Moving In',
    line2: 'Every Direction',
    sub: 'Precision cargo logistics by air, sea, road and rail.',
    cta: 'Our Services',
    href: '/services',
    image: '/images/fleet-vehicles.jpg',
    imageAlt: 'Global Express Shipments fleet of delivery vehicles',
  },
  {
    line1: 'Always Ready',
    line2: 'To Move',
    sub: 'Live tracking and real-time updates at every stage of your shipment.',
    cta: 'Start Tracking',
    href: '/track',
    image: '/images/hero-truck.jpg',
    imageAlt: 'Global Express Shipments delivery van',
  },
];

const trust = [
  { Icon: ShieldCheck, value: 'Fully Insured',   label: 'All cargo covered'   },
  { Icon: Lightning,   value: 'Express 24h',     label: 'Same-day available'  },
  { Icon: Package,     value: '500+ Delivered',  label: 'Completed shipments' },
  { Icon: Crosshair,   value: 'Live Tracking',   label: 'Real-time updates'   },
];

export default function HeroSection() {
  const [active, setActive]   = useState(0);
  const [visible, setVisible] = useState(true);
  const busy = useRef(false);

  const goTo = useCallback((idx: number) => {
    if (idx === active || busy.current) return;
    busy.current = true;
    setVisible(false);
    setTimeout(() => {
      setActive(idx);
      setVisible(true);
      busy.current = false;
    }, 320);
  }, [active]);

  useEffect(() => {
    const id = setInterval(() => goTo((active + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [active, goTo]);

  const slide = slides[active];

  return (
    <section className="relative flex flex-col overflow-hidden bg-primary min-h-[640px] sm:min-h-[680px] lg:min-h-[740px]">

      {/* Background images — CSS crossfade (no remount flash) */}
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={cn(
            'absolute inset-0 z-0 transition-opacity duration-700',
            i === active ? 'opacity-100' : 'opacity-0'
          )}
        >
          <Image
            src={s.image}
            alt={s.imageAlt}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-linear-to-r from-black/88 via-black/62 to-black/20" />
      <div className="absolute inset-0 z-[1] bg-linear-to-t from-black/55 via-transparent to-transparent" />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-1 items-center w-full">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">

            {/* Live ping badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-secondary/15 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              <span className="text-xs font-semibold text-secondary tracking-widest uppercase">
                Global Logistics
              </span>
            </div>

            {/* Headline — fade on slide change */}
            <h1
              className={cn(
                'mb-5 text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight transition-opacity duration-300',
                !visible && 'opacity-0'
              )}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="block">{slide.line1}</span>
              <span className="block text-secondary">{slide.line2}</span>
            </h1>

            {/* Subheading */}
            <p
              className={cn(
                'mb-8 text-base sm:text-lg text-white/70 max-w-sm leading-relaxed transition-opacity duration-300',
                !visible && 'opacity-0'
              )}
            >
              {slide.sub}
            </p>

            {/* CTAs */}
            <div
              className={cn(
                'flex flex-wrap gap-3 transition-opacity duration-300',
                !visible && 'opacity-0'
              )}
            >
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-primary shadow-lg shadow-secondary/40 hover:bg-secondary/85 transition-all duration-200 cursor-pointer"
              >
                {slide.cta}
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-all duration-200 cursor-pointer backdrop-blur-sm"
              >
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── Trust strip ── */}
      <div className="relative z-10 border-t border-white/8">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
            {trust.map(({ Icon, value, label }) => (
              <div key={value} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/8 border border-white/10 backdrop-blur-sm">
                  <Icon size={18} weight="duotone" className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">{value}</p>
                  <p className="text-[11px] text-white/45 leading-tight">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar: slide progress + counter ── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-5 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-0.5 rounded-full transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50',
                i === active ? 'w-10 bg-secondary' : 'w-4 bg-white/30 hover:bg-white/55'
              )}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-white/35 tabular-nums tracking-widest">
          {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

    </section>
  );
}

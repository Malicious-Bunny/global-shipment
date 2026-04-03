'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const slides = [
  {
    eyebrow: 'Global Delivery Network',
    headline: 'Delivering\nAround\nThe World',
    sub: 'Secure, tracked, on time.',
    cta: 'Track Your Shipment',
    href: '/track',
    image: '/images/hero-container-globe.jpg',
    imageAlt: 'Global Express Shipments containers',
  },
  {
    eyebrow: 'Air · Sea · Road · Rail',
    headline: 'Moving In\nEvery\nDirection',
    sub: 'Precision cargo logistics, every mode.',
    cta: 'Our Services',
    href: '/services',
    image: '/images/fleet-vehicles.jpg',
    imageAlt: 'Global Express Shipments fleet',
  },
  {
    eyebrow: 'Live Tracking',
    headline: 'Always\nReady\nTo Move',
    sub: 'Real-time updates at every stage.',
    cta: 'Start Tracking',
    href: '/track',
    image: '/images/hero-truck.jpg',
    imageAlt: 'Global Express Shipments truck',
  },
];

const stats = [
  { value: '150+', label: 'Countries' },
  { value: '500+', label: 'Deliveries' },
  { value: '24h',  label: 'Express' },
  { value: '99%',  label: 'On-time Rate' },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const busy = useRef(false);

  const goTo = useCallback((idx: number) => {
    if (idx === active || busy.current) return;
    busy.current = true;
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
      busy.current = false;
    }, 280);
  }, [active]);

  useEffect(() => {
    const id = setInterval(() => goTo((active + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [active, goTo]);

  const slide = slides[active];

  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[640px] lg:min-h-[700px] overflow-hidden bg-primary">

      {/* ── Left: Text panel ── */}
      <div className="flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-12 lg:py-16 z-10 relative">

        {/* Top: eyebrow */}
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-secondary" />
          <span
            className={cn(
              'text-[11px] tracking-[0.22em] uppercase font-medium text-secondary transition-opacity duration-280',
              fading && 'opacity-0'
            )}
          >
            {slide.eyebrow}
          </span>
        </div>

        {/* Middle: headline */}
        <div className="py-10 lg:py-0 lg:flex lg:flex-1 lg:items-center">
          <div>
            <h1
              className={cn(
                'text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-white whitespace-pre-line transition-opacity duration-280',
                fading && 'opacity-0'
              )}
            >
              {slide.headline.split('\n').map((line, i) => (
                <span key={i} className={`block ${i === 1 ? 'text-secondary' : ''}`}>{line}</span>
              ))}
            </h1>

            <p className={cn(
              'mt-6 text-sm text-white/75 tracking-wide max-w-[22rem] transition-opacity duration-280',
              fading && 'opacity-0'
            )}>
              {slide.sub}
            </p>

            <div className={cn(
              'mt-8 flex flex-wrap gap-3 transition-opacity duration-280',
              fading && 'opacity-0'
            )}>
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary/85 transition-colors duration-200 cursor-pointer"
              >
                {slide.cta}
                <ArrowRight size={15} weight="bold" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/50 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 hover:border-white/70 transition-colors duration-200 cursor-pointer"
              >
                Contact Us
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: stats + controls */}
        <div className="flex flex-col gap-5">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-px border border-white/20 rounded-xl overflow-hidden">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center py-3 px-2 bg-white/10">
                <span className="text-lg font-bold text-white leading-none">{value}</span>
                <span className="text-[10px] text-white/60 mt-0.5 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>

          {/* Slide dots */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={cn(
                    'h-0.5 rounded-full transition-all duration-400 cursor-pointer',
                    i === active ? 'w-8 bg-secondary' : 'w-3 bg-white/25 hover:bg-white/50'
                  )}
                />
              ))}
            </div>
            <span className="text-[11px] text-white/50 tabular-nums tracking-widest">
              {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* ── Right: Image panel ── */}
      <div className="relative hidden lg:block">
        {slides.map((s, i) => (
          <div
            key={s.image}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              i === active ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="50vw"
            />
            {/* Subtle left fade to blend with text panel */}
            <div className="absolute inset-0 bg-linear-to-r from-primary/60 via-transparent to-transparent" />
          </div>
        ))}

        {/* Yellow accent bar on the right edge */}
        <div className="absolute top-0 right-0 h-full w-1 bg-secondary z-10" />
      </div>

      {/* Mobile: image behind text */}
      <div className="absolute inset-0 lg:hidden">
        {slides.map((s, i) => (
          <div
            key={`mob-${s.image}`}
            className={cn('absolute inset-0 transition-opacity duration-700', i === active ? 'opacity-100' : 'opacity-0')}
          >
            <Image src={s.image} alt={s.imageAlt} fill priority={i === 0} className="object-cover object-center opacity-20" sizes="100vw" />
          </div>
        ))}
      </div>

    </section>
  );
}

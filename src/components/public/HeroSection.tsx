'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim().toUpperCase();
    if (q) router.push(`/track/${q}`);
  }

  return (
    <section
      className="relative w-full overflow-hidden pb-10 pt-28 font-light text-white antialiased md:pb-16 md:pt-32"
      style={{ background: 'linear-gradient(135deg, #0a0613 0%, #150d27 100%)' }}
    >
      {/* Purple glow — top right */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-1/2 w-1/2"
        style={{ background: 'radial-gradient(circle at 70% 30%, rgba(155,135,245,0.15) 0%, rgba(13,10,25,0) 60%)' }}
      />
      {/* Purple glow — top left */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100"
        style={{ background: 'radial-gradient(circle at 70% 30%, rgba(155,135,245,0.15) 0%, rgba(13,10,25,0) 60%)' }}
      />

      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">

        {/* ── Text block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <span className="mb-6 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-xs text-[#9b87f5] uppercase tracking-widest">
            Worldwide Logistics &amp; Courier — Swansea, Wales UK
          </span>

          {/* Headline */}
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light leading-tight md:text-5xl lg:text-7xl" style={{ letterSpacing: '-0.02em' }}>
            Ship Smarter with{' '}
            <span className="text-[#9b87f5]">Real-Time</span> Global Tracking
          </h1>

          {/* Sub-copy */}
          <p className="mx-auto mb-10 max-w-2xl text-base text-white/60 md:text-xl leading-relaxed">
            Global Express Shipments delivers fast, reliable, and transparent logistics for businesses
            and individuals — road, air, and ocean freight, tracked every step of the way.
          </p>

          {/* CTA row */}
          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:mb-0">
            {/* Track form */}
            <form
              onSubmit={handleTrack}
              className="flex w-full max-w-sm items-center overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-sm sm:w-auto"
            >
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter tracking number..."
                autoComplete="off"
                className="flex-1 bg-transparent px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none min-w-0 sm:w-52"
              />
              <button
                type="submit"
                className="neumorphic-button relative overflow-hidden shrink-0 rounded-full border border-[#9b87f5]/30 bg-gradient-to-b from-[#9b87f5]/20 to-[#9b87f5]/10 px-5 py-3.5 text-white transition-all duration-300 hover:border-[#9b87f5]/60 cursor-pointer"
                aria-label="Track shipment"
              >
                <MagnifyingGlass size={15} weight="bold" />
              </button>
            </form>

            {/* Services link */}
            <Link
              href="/services"
              className="flex w-full items-center justify-center gap-1.5 text-white/60 transition-colors hover:text-white sm:w-auto"
            >
              <span className="text-sm">Our Services</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* ── Globe + image block ── */}
        <motion.div
          className="relative mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          {/* Earth globe */}
          <div className="relative flex h-40 w-full overflow-hidden md:h-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://blocks.mvp-subha.me/assets/earth.png"
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 top-0 mx-auto -z-10 -translate-x-1/2 px-4 opacity-80"
            />
          </div>

          {/* Hero image */}
          <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-xl shadow-[0_0_50px_rgba(155,135,245,0.2)]">
            <Image
              src="/images/hero-container-globe.jpg"
              alt="Global Express Shipments worldwide operations"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-xl border border-white/10"
              priority
            />
            {/* Fade bottom */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0613] to-transparent" />
          </div>

          {/* Floating stats */}
          <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 items-center gap-8 rounded-full border border-white/10 bg-white/5 px-8 py-3 backdrop-blur-md">
            {[
              { value: '32K+', label: 'Deliveries'   },
              { value: '98%',  label: 'On-Time Rate' },
              { value: '150+', label: 'Countries'    },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-base font-semibold text-white leading-none">{value}</p>
                <p className="mt-0.5 text-[10px] text-white/45 uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

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
      className="relative w-full overflow-hidden pb-8 pt-20 font-light text-white antialiased sm:pb-10 sm:pt-24 md:pb-16 md:pt-32"
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

      <div className="relative z-10 mx-auto w-full max-w-2xl px-5 text-center sm:px-6 md:max-w-4xl md:px-6 lg:max-w-7xl">

        {/* ── Text block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <span className="mb-5 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-[10px] text-[#9b87f5] uppercase tracking-widest sm:text-xs sm:mb-6">
            Worldwide Logistics &amp; Courier — Swansea, Wales UK
          </span>

          {/* Headline */}
          <h1
            className="mx-auto mb-5 max-w-4xl font-light leading-[1.1] sm:mb-6"
            style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)', letterSpacing: '-0.02em' }}
          >
            Ship Smarter with{' '}
            <span className="text-[#9b87f5]">Real-Time</span>{' '}
            Global Tracking
          </h1>

          {/* Sub-copy */}
          <p className="mx-auto mb-8 max-w-lg text-sm text-white/55 leading-relaxed sm:max-w-2xl sm:text-base md:text-xl">
            Global Express Shipments delivers fast, reliable, and transparent logistics for businesses
            and individuals — road, air, and ocean freight, tracked every step of the way.
          </p>

          {/* CTA row */}
          <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 sm:mb-0">
            {/* Track form */}
            <form
              onSubmit={handleTrack}
              className="flex w-full items-center overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-sm sm:w-auto"
            >
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter tracking number..."
                autoComplete="off"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none min-w-0 sm:px-5 sm:py-3.5 sm:w-52"
              />
              <button
                type="submit"
                className="neumorphic-button relative overflow-hidden shrink-0 rounded-full border border-[#9b87f5]/30 bg-linear-to-b from-[#9b87f5]/20 to-[#9b87f5]/10 px-4 py-3 text-white transition-all duration-300 hover:border-[#9b87f5]/60 cursor-pointer sm:px-5 sm:py-3.5"
                aria-label="Track shipment"
              >
                <MagnifyingGlass size={15} weight="bold" />
              </button>
            </form>

            {/* Services link */}
            <Link
              href="/services"
              className="flex items-center justify-center gap-1.5 text-white/55 transition-colors hover:text-white"
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
          className="relative mt-6 sm:mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          {/* Earth globe — smaller on mobile */}
          <div className="relative flex h-24 w-full overflow-hidden sm:h-40 md:h-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://blocks.mvp-subha.me/assets/earth.png"
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 w-48 opacity-70 sm:w-auto sm:px-4 sm:opacity-80"
            />
          </div>

          {/* Hero image */}
          <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-lg shadow-[0_0_50px_rgba(155,135,245,0.2)] sm:rounded-xl">
            <Image
              src="/images/hero-container-globe.jpg"
              alt="Global Express Shipments worldwide operations"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-lg border border-white/10 sm:rounded-xl"
              priority
            />
            {/* Fade bottom */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#0a0613] to-transparent sm:h-32" />
          </div>

          {/* Floating stats — tighter on mobile */}
          <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md sm:gap-8 sm:px-8 sm:py-3 sm:bottom-12">
            {[
              { value: '32K+', label: 'Deliveries'   },
              { value: '98%',  label: 'On-Time'      },
              { value: '150+', label: 'Countries'    },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-sm font-semibold text-white leading-none sm:text-base">{value}</p>
                <p className="mt-0.5 text-[9px] text-white/40 uppercase tracking-wider sm:text-[10px]">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X, Phone } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';

const navLinks = [
  { label: 'Home',         href: '/'        },
  { label: 'Track Order',  href: '/track'   },
  { label: 'Our Services', href: '/services'},
  { label: 'Solutions',    href: '/faq'     },
  { label: 'About Us',     href: '/about'   },
];

export default function Header() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#0a0613]/95 backdrop-blur-md shadow-[0_2px_30px_rgba(155,135,245,0.15)] border-b border-white/5'
            : 'bg-[#0a0613]/80 backdrop-blur-sm'
        )}
      >
        {/* Top bar */}
        <div className="border-b border-white/5 hidden md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-9">
              <p className="text-[11px] text-white/40 font-light">
                Worldwide Logistics & Courier — Swansea, Wales UK
              </p>
              <a
                href="tel:+447415413409"
                className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-[#9b87f5] transition-colors"
              >
                <Phone size={11} weight="fill" className="text-[#9b87f5]" />
                +44 7415 413409
              </a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-8">

            {/* Logo */}
            <Link href="/" aria-label="Global Express Shipments home" className="shrink-0">
              <Logo height={36} className="brightness-0 invert" />
            </Link>

            {/* Nav — desktop */}
            <nav
              className="hidden md:flex items-center gap-0.5 flex-1 justify-center"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-4 py-2 text-sm rounded-full transition-all duration-150 font-light',
                      active
                        ? 'text-[#9b87f5] font-medium bg-[#9b87f5]/10 border border-[#9b87f5]/20'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center shrink-0">
              <Link
                href="/track"
                className="neumorphic-button relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-[#9b87f5]/30 bg-linear-to-b from-[#9b87f5]/20 to-[#9b87f5]/10 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#9b87f5]/60"
              >
                Track Your Order
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <List size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-72 shadow-2xl transition-transform duration-300 ease-out border-l border-white/5',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ background: 'linear-gradient(160deg, #0f0820 0%, #0a0613 100%)' }}
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
          <Logo height={30} className="brightness-0 invert" />
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="p-3 space-y-0.5">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between px-3.5 py-3 text-sm rounded-xl transition-colors duration-150',
                  active
                    ? 'bg-[#9b87f5]/10 text-[#9b87f5] font-medium border border-[#9b87f5]/20'
                    : 'text-white/60 hover:bg-white/5 hover:text-white font-light'
                )}
              >
                {link.label}
                {active && <span className="h-1.5 w-1.5 rounded-full bg-[#9b87f5]" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pt-2">
          <Link
            href="/track"
            onClick={() => setOpen(false)}
            className="neumorphic-button relative flex items-center justify-center gap-2 overflow-hidden w-full py-3 text-sm font-medium rounded-full border border-[#9b87f5]/30 bg-linear-to-b from-[#9b87f5]/20 to-[#9b87f5]/10 text-white transition-all duration-300 hover:border-[#9b87f5]/60"
          >
            Track Your Order
          </Link>
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-5">
          <p className="text-xs text-white/25 text-center font-light">
            © {new Date().getFullYear()} Global Express Shipments
          </p>
        </div>
      </aside>
    </>
  );
}

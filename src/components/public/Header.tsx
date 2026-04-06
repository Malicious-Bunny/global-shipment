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
          'sticky top-0 z-50 bg-navy transition-shadow duration-300',
          scrolled ? 'shadow-[0_2px_20px_rgba(0,0,0,0.4)]' : ''
        )}
      >
        {/* Top bar */}
        <div className="border-b border-white/10 hidden md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-9">
              <p className="text-[11px] text-white/55 font-medium">
                Worldwide Logistics & Courier — Swansea, Wales UK
              </p>
              <a
                href="tel:+447415413409"
                className="flex items-center gap-1.5 text-[11px] text-white/55 hover:text-white transition-colors"
              >
                <Phone size={11} weight="fill" className="text-primary-foreground" />
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
                      'px-4 py-2 text-sm rounded-lg transition-colors duration-150',
                      active
                        ? 'text-white font-semibold bg-white/10'
                        : 'text-white hover:text-white/90 hover:bg-white/8 font-medium'
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
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary-foreground/90 transition-colors duration-150"
              >
                Track Your Order
              </Link>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-lg text-white hover:text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
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
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-72 bg-navy shadow-2xl transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <Logo height={30} className="brightness-0 invert" />
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
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
                    ? 'bg-primary/20 text-white font-semibold'
                    : 'text-white hover:bg-white/8 hover:text-white/90'
                )}
              >
                {link.label}
                {active && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pt-2">
          <Link
            href="/track"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-lg bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors"
          >
            Track Your Order
          </Link>
        </div>

        <div className="absolute bottom-8 left-0 right-0 px-5">
          <p className="text-xs text-white/45 text-center">
            © {new Date().getFullYear()} Global Express Shipments
          </p>
        </div>
      </aside>
    </>
  );
}

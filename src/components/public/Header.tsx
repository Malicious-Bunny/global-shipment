'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, X, ArrowRight } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/Logo';

const navLinks = [
  { label: 'Home',          href: '/' },
  { label: 'About',         href: '/about' },
  { label: 'Services',      href: '/services' },
  { label: 'Track & Trace', href: '/track' },
  { label: 'FAQ',           href: '/faq' },
  { label: 'Contact',       href: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[60px] items-center justify-between gap-8">

            {/* Logo */}
            <Link href="/" aria-label="Global Express Shipments home" className="shrink-0">
              <Logo height={32} />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5 flex-1" aria-label="Primary navigation">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-3.5 py-2 text-[13px] font-medium rounded-lg transition-colors duration-150 cursor-pointer',
                      active
                        ? 'text-primary'
                        : 'text-neutral-500 hover:text-primary'
                    )}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-secondary" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center">
              <Link
                href="/track"
                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-4 py-2 text-[13px] font-semibold text-primary hover:bg-secondary/85 transition-colors duration-150 cursor-pointer"
              >
                Track Shipment
                <ArrowRight size={13} weight="bold" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-lg text-neutral-500 hover:text-primary hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <List size={20} />
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
          'fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-out border-l border-neutral-200',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-5 h-[60px] border-b border-neutral-100">
          <Logo height={28} />
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-primary hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-4 space-y-0.5">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-colors duration-150 cursor-pointer',
                  active
                    ? 'bg-neutral-100 text-primary font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-primary'
                )}
              >
                {link.label}
                {active && <span className="h-1.5 w-1.5 rounded-full bg-secondary" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pt-2 border-t border-neutral-100">
          <Link
            href="/track"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-xl bg-secondary text-primary hover:bg-secondary/85 transition-colors cursor-pointer"
          >
            Track Shipment
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </aside>
    </>
  );
}

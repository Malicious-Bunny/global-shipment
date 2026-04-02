'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, List, X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home',          href: '/' },
  { label: 'About Us',      href: '/about' },
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
      <header className="sticky top-0 z-50 bg-surface border-b border-neutral-200 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Global Express Shipments home">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 ring-1 ring-secondary/20 transition-colors group-hover:bg-secondary/20">
                <Package size={20} weight="duotone" className="text-secondary" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-primary tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
                  GLOBAL EXPRESS
                </p>
                <p className="text-[10px] text-neutral-400 tracking-[0.2em] uppercase">Shipments</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2 text-sm rounded-lg transition-colors duration-150 cursor-pointer',
                    isActive(link.href)
                      ? 'text-primary bg-neutral-100 font-medium'
                      : 'text-neutral-600 hover:text-primary hover:bg-neutral-100'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/track"
                className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg bg-secondary text-primary hover:bg-secondary/80 transition-colors duration-150 cursor-pointer"
              >
                Track Shipment
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-lg text-neutral-500 hover:text-primary hover:bg-neutral-100 transition-colors cursor-pointer"
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
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-72 bg-surface shadow-xl transition-transform duration-300 ease-out border-l border-neutral-200',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Package size={18} weight="duotone" className="text-secondary" />
            <span className="text-sm font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
              Navigation
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-primary hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="p-3 space-y-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center px-3.5 py-2.5 text-sm rounded-lg transition-colors duration-150 cursor-pointer',
                isActive(link.href)
                  ? 'text-primary bg-neutral-100 font-medium'
                  : 'text-neutral-600 hover:text-primary hover:bg-neutral-100'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 pt-2 border-t border-neutral-200 mt-2">
          <Link
            href="/track"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-secondary text-primary hover:bg-secondary/80 transition-colors cursor-pointer"
          >
            Track Shipment
          </Link>
        </div>
      </aside>
    </>
  );
}

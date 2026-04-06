'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  List, SquaresFour, Truck, Plus, SignOut, ArrowSquareOut, X,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import Logo from '@/components/ui/Logo';

const navItems = [
  { label: 'Dashboard',    href: '/admin/dashboard',      Icon: SquaresFour },
  { label: 'Shipments',    href: '/admin/shipments',       Icon: Truck },
  { label: 'New Shipment', href: '/admin/shipments/new',  Icon: Plus },
];

function isActive(href: string, pathname: string) {
  if (pathname === href) return true;
  if (href === '/admin/shipments') {
    return pathname.startsWith('/admin/shipments/') && !pathname.startsWith('/admin/shipments/new');
  }
  return false;
}

export default function AdminNav({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
    router.refresh();
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Top accent stripe */}
      <div className="h-0.5 w-full bg-primary shrink-0" />

      {/* Logo */}
      <div className="flex flex-col gap-0.5 px-5 py-4 border-b border-sidebar-border">
        <Logo height={28} className="brightness-0 invert" />
        <p className="text-[9px] text-sidebar-foreground/50 tracking-[0.2em] uppercase pl-0.5">Admin Panel</p>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Admin navigation">
        {navItems.map(({ label, href, Icon }) => {
          const active = isActive(href, pathname);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 cursor-pointer',
                active
                  ? 'border-l-2 border-primary bg-sidebar-accent pl-2.5 text-sidebar-accent-foreground font-semibold'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <Icon size={17} weight={active ? 'duotone' : 'regular'} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border px-3 pb-4 pt-3 space-y-0.5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors cursor-pointer"
        >
          <ArrowSquareOut size={17} />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors cursor-pointer"
        >
          <SignOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar (sticky in flow) */}
      <aside className="hidden md:flex w-60 flex-col sticky top-0 h-screen shrink-0">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-60 md:hidden transition-transform duration-300 ease-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="relative h-full">
          {sidebar}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-3 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>
      </aside>

      {/* Content area */}
      <div className="flex flex-1 flex-col min-w-0 bg-muted">
        {/* Mobile topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card px-4 shadow-xs md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-neutral-500 hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Open sidebar"
          >
            <List size={20} />
          </button>
          <Logo height={24} />
          <button
            onClick={handleLogout}
            className="ml-auto p-2 rounded-lg text-neutral-400 hover:text-danger hover:bg-danger/5 transition-colors cursor-pointer"
            aria-label="Sign out"
          >
            <SignOut size={18} />
          </button>
        </header>

        {/* Desktop topbar */}
        <header className="hidden md:flex sticky top-0 z-20 h-14 items-center border-b border-border bg-card px-6 shadow-xs gap-3">
          <div className="h-5 w-0.5 bg-primary rounded-full" />
          <span className="flex-1 text-sm font-semibold text-foreground">Admin Panel</span>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-500 hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <ArrowSquareOut size={13} />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-500 hover:text-danger hover:bg-danger/5 transition-colors cursor-pointer"
          >
            <SignOut size={13} />
            Sign Out
          </button>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

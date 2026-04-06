'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WarningCircle, CircleNotch, ArrowRight, ShieldCheck, Crosshair, Lightning } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';
import Logo from '@/components/ui/Logo';

const features = [
  { Icon: ShieldCheck, text: 'Secure, role-based access'  },
  { Icon: Crosshair,   text: 'Real-time shipment tracking' },
  { Icon: Lightning,   text: 'Instant status updates'      },
];

export default function AdminLoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const router   = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
      return;
    }
    router.push('/admin/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left: brand panel ── */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between p-10 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #1a0f3a 0%, #0f0820 100%)' }}>
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo */}
        <div className="relative">
          <Logo height={32} className="brightness-0 invert" />
        </div>

        {/* Hero copy */}
        <div className="relative">
          <div className="h-1 w-10 bg-[#9b87f5] rounded-full mb-7" />
          <h2
            className="text-4xl font-bold text-white leading-[1.1] mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Manage your<br />
            <span className="text-primary-foreground">shipments</span><br />
            worldwide.
          </h2>
          <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-8">
            Full control over shipment creation, tracking events, and delivery status — all from one panel.
          </p>

          <ul className="space-y-3">
            {features.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 border border-white/15">
                  <Icon size={14} weight="duotone" className="text-[#9b87f5]" />
                </div>
                <span className="text-sm text-white/55">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-white/25">
          © {new Date().getFullYear()} Global Express Shipments
        </p>
      </div>

      {/* ── Right: form panel ── */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex justify-center mb-10 lg:hidden">
            <Logo height={36} />
          </div>

          <h1
            className="text-2xl font-bold text-foreground mb-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Admin Login
          </h1>
          <p className="text-sm text-neutral-500 mb-8">Sign in to manage shipments</p>

          {error && (
            <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger">
              <WarningCircle size={15} weight="fill" className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="w-full rounded-lg border border-neutral-200 bg-background px-4 py-3 text-sm text-foreground placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-neutral-200 bg-background px-4 py-3 text-sm text-foreground placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/85 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              {loading
                ? <><CircleNotch size={16} className="animate-spin" /> Signing in…</>
                : <><ArrowRight size={16} weight="bold" /> Sign In</>
              }
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-neutral-400">
            Global Express Shipments Admin Portal
          </p>
        </div>
      </div>

    </div>
  );
}

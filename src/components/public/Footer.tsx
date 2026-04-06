import Link from 'next/link';
import Image from 'next/image';
import { Phone, Envelope, MapPin } from '@phosphor-icons/react/dist/ssr';
import Logo from '@/components/ui/Logo';

const quickLinks = [
  { label: 'Home',          href: '/'        },
  { label: 'About Us',      href: '/about'   },
  { label: 'Services',      href: '/services'},
  { label: 'Track & Trace', href: '/track'   },
  { label: 'FAQ',           href: '/faq'     },
  { label: 'Contact',       href: '/contact' },
];

const services = [
  { label: 'Air Freight',   href: '/services/air-freight'   },
  { label: 'Ocean Freight', href: '/services/ocean-freight' },
  { label: 'Road Freight',  href: '/services/road-freight'  },
  { label: 'Rail Freight',  href: '/services/rail-freight'  },
  { label: 'Warehousing',   href: '/services/warehousing'   },
  { label: 'Project Cargo', href: '/services/project-cargo' },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden text-white" style={{ background: 'linear-gradient(160deg, #0f0820 0%, #0a0613 100%)' }}>
      {/* Purple top accent line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(155,135,245,0.6), transparent)' }} />

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Logo height={34} className="brightness-0 invert" />
            </div>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs font-light">
              Fast, reliable, and transparent logistics for individuals and businesses — delivered worldwide with precision.
            </p>
            <div className="mt-6 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#9b87f5] animate-pulse" />
              <span className="text-xs text-white/35 font-light">All systems operational</span>
            </div>
          </div>

          {/* Menu / Quick Links */}
          <div>
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Menu
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 hover:text-[#9b87f5] transition-colors duration-150 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/45 hover:text-[#9b87f5] transition-colors duration-150 font-light"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office / Contact */}
          <div>
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Office
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} weight="fill" className="text-[#9b87f5] mt-0.5 shrink-0" />
                <span className="text-sm text-white/45 leading-relaxed font-light">
                  Global Express Shipments Ltd<br />
                  Swansea, Wales, United Kingdom
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} weight="fill" className="text-[#9b87f5] shrink-0" />
                <a href="tel:+447415413409" className="text-sm text-white/45 hover:text-[#9b87f5] transition-colors font-light">
                  +44 7415 413409
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Envelope size={14} weight="fill" className="text-[#9b87f5] shrink-0" />
                <a
                  href="mailto:info@documents-consultancy.com"
                  className="text-sm text-white/45 hover:text-[#9b87f5] transition-colors break-all font-light"
                >
                  info@documents-consultancy.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25 font-light">
            © {new Date().getFullYear()} Global Express Shipments. All rights reserved.
          </p>
          <Link
            href="/track"
            className="text-xs font-medium text-white/35 hover:text-[#9b87f5] transition-colors"
          >
            Track a Shipment →
          </Link>
        </div>
      </div>

      {/* Hero image at bottom */}
      <div className="relative h-56 sm:h-72 w-full">
        <Image
          src="/images/hero-container-globe.jpg"
          alt="GES global shipping operations"
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0613] via-[#0a0613]/60 to-transparent" />
      </div>
    </footer>
  );
}

import Link from 'next/link';
import { Phone, Envelope, MapPin, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Logo from '@/components/ui/Logo';

const quickLinks = [
  { label: 'Home',          href: '/' },
  { label: 'About Us',      href: '/about' },
  { label: 'Services',      href: '/services' },
  { label: 'Track & Trace', href: '/track' },
  { label: 'FAQ',           href: '/faq' },
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
    <footer className="bg-neutral-950 text-white">
      {/* Yellow top accent */}
      <div className="h-0.5 w-full bg-secondary" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Logo height={30} className="brightness-0 invert" />
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Fast, reliable, and secure logistics solutions for businesses and individuals worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-150 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/55 hover:text-white transition-colors duration-150 cursor-pointer inline-flex items-center gap-1 group"
                  >
                    {s.label}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} weight="duotone" className="text-secondary mt-0.5 shrink-0" />
                <span className="text-sm text-white/55">Swansea, Wales UK</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} weight="duotone" className="text-secondary shrink-0" />
                <span className="text-sm text-white/55">+44 7415 413409</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Envelope size={15} weight="duotone" className="text-secondary shrink-0" />
                <span className="text-sm text-white/55">info@documents-consultancy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Global Express Shipments. All rights reserved.
          </p>
          <Link
            href="/track"
            className="text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors cursor-pointer"
          >
            Track a Shipment →
          </Link>
        </div>
      </div>
    </footer>
  );
}

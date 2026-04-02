import Link from 'next/link';
import { Phone, Envelope, MapPin } from '@phosphor-icons/react/dist/ssr';
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
  'Air Freight',
  'Ocean Freight',
  'Road Freight',
  'Rail Freight',
  'Warehousing',
  'Project Cargo',
];

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 overflow-hidden">
      {/* Yellow accent bar */}
      <div className="h-1 w-full bg-secondary" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo height={32} />
            </div>
            <p className="text-sm leading-relaxed text-neutral-500 max-w-xs">
              Delivering your parcels and cargo worldwide with speed, safety, and reliability.
              Your trusted logistics partner.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 hover:text-primary transition-colors duration-150 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s} className="text-sm text-neutral-500">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} weight="duotone" className="text-secondary mt-0.5 shrink-0" />
                <span className="text-sm text-neutral-500">Swansea, Wales UK</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} weight="duotone" className="text-secondary shrink-0" />
                <span className="text-sm text-neutral-500">+44 7415 413409</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Envelope size={16} weight="duotone" className="text-secondary shrink-0" />
                <span className="text-sm text-neutral-500">info@documents-consultancy.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-6">
          <p className="text-center text-xs text-neutral-400">
            © {new Date().getFullYear()} Global Express Shipments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

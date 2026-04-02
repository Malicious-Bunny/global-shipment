import { Phone, Envelope, MapPin, Clock } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact Us — Global Express Shipments' };

const contactItems = [
  {
    Icon: MapPin,
    title: 'Address',
    lines: ['123 Logistics Park, Business District', 'London, UK, EC1A 1BB'],
  },
  {
    Icon: Phone,
    title: 'Phone',
    lines: ['+44 20 7946 0123', '+44 20 7946 0124'],
  },
  {
    Icon: Envelope,
    title: 'Email',
    lines: ['info@globalexpressshipments.com', 'support@globalexpressshipments.com'],
  },
  {
    Icon: Clock,
    title: 'Office Hours',
    lines: ['Monday – Friday: 8:00 AM – 6:00 PM', 'Saturday: 9:00 AM – 1:00 PM'],
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="bg-neutral-50 border-b border-neutral-200 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-1 w-10 bg-secondary rounded-full mb-5" />
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            Contact Us
          </h1>
          <p className="mt-2 text-neutral-500">We are here to help with all your shipping needs</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <h2 className="text-center text-2xl font-semibold text-primary mb-10" style={{ fontFamily: 'var(--font-display)' }}>
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contactItems.map(({ Icon, title, lines }) => (
            <div
              key={title}
              className="flex gap-4 rounded-xl border border-neutral-200 bg-surface p-5 shadow-xs"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                <Icon size={20} weight="duotone" className="text-secondary" />
              </div>
              <div>
                <h3 className="mb-1.5 font-semibold text-primary text-sm" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
                {lines.map((line) => (
                  <p key={line} className="text-sm text-neutral-500 leading-relaxed">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import { Phone, Envelope, MapPin, Clock } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact Us — Global Express Shipments' };

const contactItems = [
  {
    Icon: MapPin,
    title: 'Address',
    lines: ['Swansea, Wales UK'],
  },
  {
    Icon: Phone,
    title: 'Phone',
    lines: ['+44 7415 413409'],
  },
  {
    Icon: Envelope,
    title: 'Email',
    lines: ['info@documents-consultancy.com'],
  },
  {
    Icon: Clock,
    title: 'Office Hours',
    lines: ['Mon – Fri: 8:00 AM – 6:00 PM', 'Saturday: 9:00 AM – 1:00 PM'],
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="bg-background border-b border-border py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="h-px w-5 bg-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Reach Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground">Contact Us</h1>
          <p className="mt-3 text-muted-foreground">We are here to help with all your shipping needs.</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactItems.map(({ Icon, title, lines }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/40 transition-colors"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon size={20} weight="duotone" className="text-primary" />
              </div>
              <div>
                <h3 className="mb-1.5 font-semibold text-foreground text-sm">{title}</h3>
                {lines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground leading-relaxed">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

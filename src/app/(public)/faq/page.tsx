'use client';

import { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const faqs = [
  { q: 'How do I track my shipment?', a: 'Go to our Track & Trace page and enter your tracking number (starting with GES). You will see the current status and full history of your shipment.' },
  { q: 'What does my tracking number look like?', a: 'Your tracking number starts with "GES" followed by 18 digits — for example: GES051828334831272262. It was provided to you when your shipment was booked.' },
  { q: 'How long does delivery take?', a: 'Delivery times depend on the service chosen. Air freight typically takes 1–5 days internationally. Road freight within the UK is usually 1–2 days. Ocean freight can take 2–6 weeks depending on destination.' },
  { q: 'What types of cargo can you ship?', a: 'We ship documents, parcels, general freight, and vehicles. We also handle specialist cargo such as temperature-sensitive goods and oversized project cargo.' },
  { q: 'Is my shipment insured?', a: 'All shipments are handled with care and standard liability cover is included. We recommend taking out comprehensive cargo insurance for high-value items — ask our team for details.' },
  { q: 'Can I change the delivery address after shipping?', a: 'Address changes may be possible depending on the stage of the shipment. Please contact our support team as soon as possible with your tracking number.' },
  { q: 'What happens if my parcel is delayed?', a: 'Our team will proactively notify you of any delays and provide an updated estimated delivery time. You can also check the tracking page for the latest status updates.' },
  { q: 'Do you handle customs clearance?', a: 'Yes. We provide full customs clearance support for international shipments. Our team can assist with documentation, duties, and taxes to ensure smooth clearance.' },
  { q: 'How do I get a quote?', a: 'Please contact us via phone or email with your shipment details (origin, destination, weight, dimensions) and our team will provide a competitive quote promptly.' },
];

export default function FAQPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <>
      <div className="bg-neutral-50 border-b border-neutral-200 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-1 w-10 bg-secondary rounded-full mb-5" />
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-neutral-500">Everything you need to know about our services</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const open = expanded === i;
            return (
              <div
                key={i}
                className={cn(
                  'rounded-xl border bg-surface shadow-xs overflow-hidden transition-colors',
                  open ? 'border-secondary/30' : 'border-neutral-200'
                )}
              >
                <button
                  onClick={() => setExpanded(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-neutral-50 transition-colors"
                  aria-expanded={open}
                >
                  <span className="text-sm font-semibold text-primary">{faq.q}</span>
                  <CaretDown
                    size={16}
                    className={cn(
                      'shrink-0 text-neutral-400 transition-transform duration-200',
                      open ? 'rotate-180 text-secondary' : ''
                    )}
                  />
                </button>
                {open && (
                  <div className="border-t border-neutral-100 px-5 py-4">
                    <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

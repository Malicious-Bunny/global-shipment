'use client';

import { useState } from 'react';
import { Plus, Minus } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

const faqs = [
  { q: 'How do I track my shipment?',               a: 'Go to our Track & Trace page and enter your tracking number (starting with GES). You will see the current status and full history of your shipment.' },
  { q: 'What does my tracking number look like?',   a: 'Your tracking number starts with "GES" followed by 18 digits — for example: GES051828334831272262. It was provided to you when your shipment was booked.' },
  { q: 'How long does delivery take?',              a: 'Delivery times depend on the service. Air freight typically takes 1–5 days internationally. Road freight within the UK is usually 1–2 days. Ocean freight can take 2–6 weeks depending on destination.' },
  { q: 'What types of cargo can you ship?',         a: 'We ship documents, parcels, general freight, and vehicles. We also handle specialist cargo such as temperature-sensitive goods and oversized project cargo.' },
  { q: 'Is my shipment insured?',                   a: 'All shipments have standard liability cover included. We recommend comprehensive cargo insurance for high-value items — ask our team for details.' },
  { q: 'Can I change the delivery address?',        a: 'Address changes may be possible depending on the stage. Please contact us as soon as possible with your tracking number.' },
  { q: 'What happens if my parcel is delayed?',     a: 'Our team will proactively notify you of any delays and provide an updated estimated delivery time. You can also check the tracking page for the latest status.' },
  { q: 'Do you handle customs clearance?',          a: 'Yes. We provide full customs clearance support for international shipments, including documentation, duties, and taxes.' },
  { q: 'How do I get a quote?',                     a: 'Contact us by phone or email with your shipment details (origin, destination, weight, dimensions) and our team will respond with a competitive quote promptly.' },
];

export default function FAQPage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <>
      <div className="bg-background border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">Support</p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground">Frequently Asked Questions</h1>
          <p className="mt-3 text-muted-foreground">Everything you need to know about our services and how they work.</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <div className="divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          {faqs.map((faq, i) => {
            const open = expanded === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setExpanded(open ? null : i)}
                  className={cn(
                    'flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-150 cursor-pointer',
                    open ? 'bg-primary/5' : 'hover:bg-muted/50'
                  )}
                  aria-expanded={open}
                >
                  <span className={cn('text-sm font-medium', open ? 'text-primary' : 'text-foreground')}>
                    {faq.q}
                  </span>
                  <div className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors border',
                    open ? 'bg-primary/20 border-primary/40' : 'bg-muted border-border'
                  )}>
                    {open
                      ? <Minus size={11} weight="bold" className="text-primary" />
                      : <Plus size={11} weight="bold" className="text-muted-foreground" />
                    }
                  </div>
                </button>
                {open && (
                  <div className="px-6 pb-5 bg-primary/5 border-t border-primary/10">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-2">{faq.a}</p>
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

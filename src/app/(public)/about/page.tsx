import Image from 'next/image';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About Us — Global Express Shipments' };

const values = [
  { title: 'Speed',          desc: 'Express options on all routes with guaranteed delivery windows.' },
  { title: 'Reliability',    desc: '98%+ on-time rate — your goods arrive when promised, every time.' },
  { title: 'Transparency',   desc: 'Full visibility at every stage with real-time tracking and proactive updates.' },
  { title: 'Safety',         desc: 'All shipments handled with care and covered by comprehensive cargo insurance.' },
  { title: 'Global Reach',   desc: 'A network spanning 150+ countries, reaching virtually any destination.' },
  { title: 'Customer First', desc: 'Dedicated support at every step of your shipping journey.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-background border-b border-border py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground">About Us</h1>
          <p className="mt-3 text-muted-foreground max-w-md">Your trusted global logistics partner — built on trust, driven by technology.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 space-y-24">

        {/* Who we are */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">Who We Are</p>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-6">
              A logistics company built on trust.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Global Express Shipments is a leading international courier and cargo company
              providing fast, reliable, and secure logistics solutions to businesses and
              individuals worldwide.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With years of experience in the industry, we have built a reputation for
              excellence — handling everything from small documents to complex project cargo
              with the same level of care and professionalism.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-border">
            <Image
              src="/images/about-container.jpg"
              alt="Global Express Shipments shipping container at port"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md order-2 lg:order-1 border border-border">
            <Image
              src="/images/fleet-vehicles.jpg"
              alt="Global Express Shipments fleet"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">Our Mission</p>
            <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-6">
              Making global commerce simple.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To connect businesses and people across the world through fast, affordable,
              and transparent shipping — making global commerce accessible for everyone.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We invest in technology, people, and partnerships to continuously improve
              our services and deliver an exceptional experience from booking to delivery.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-3">What We Stand For</p>
          <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-10">Our core values.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map(({ title, desc }) => (
              <div key={title} className="rounded-2xl bg-card border border-border p-6 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(155,135,245,0.08)] transition-all duration-200">
                <div className="flex items-center gap-2.5 mb-3">
                  <CheckCircle size={16} weight="duotone" className="text-primary shrink-0" />
                  <h3 className="font-semibold text-foreground text-sm">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

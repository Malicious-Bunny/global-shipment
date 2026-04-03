import Image from 'next/image';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About Us — Global Express Shipments' };

const values = [
  { title: 'Speed',          desc: 'Express options on all routes with guaranteed delivery windows.' },
  { title: 'Reliability',    desc: '98%+ on-time rate — your goods arrive when promised, every time.' },
  { title: 'Transparency',   desc: 'Full visibility at every stage with real-time tracking and proactive updates.' },
  { title: 'Safety',         desc: 'All shipments handled with care and covered by comprehensive cargo insurance.' },
  { title: 'Global Reach',   desc: 'A network spanning 50+ countries, reaching virtually any destination worldwide.' },
  { title: 'Customer First', desc: 'Dedicated support at every step of your shipping journey.' },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="h-px w-5 bg-secondary" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">{children}</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <div className="relative bg-primary overflow-hidden" style={{ minHeight: 320 }}>
        <Image
          src="/images/about-staff.jpg"
          alt="Global Express Shipments team"
          fill priority
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <Eyebrow>Our Story</Eyebrow>
          <h1 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>
            About Us
          </h1>
          <p className="mt-3 text-white/50 text-base max-w-md">Your trusted global logistics partner</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 space-y-24">

        {/* Who we are */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6" style={{ letterSpacing: '-0.02em' }}>
              A logistics company built on trust.
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-4">
              Global Express Shipments is a leading international courier and cargo company
              providing fast, reliable, and secure logistics solutions to businesses and
              individuals worldwide.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              With years of experience in the industry, we have built a reputation for
              excellence — handling everything from small documents to complex project cargo
              with the same level of care and professionalism.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
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
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1">
            <Image
              src="/images/fleet-vehicles.jpg"
              alt="Global Express Shipments fleet"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <Eyebrow>Our Mission</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6" style={{ letterSpacing: '-0.02em' }}>
              Making global commerce simple.
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-4">
              To connect businesses and people across the world through fast, affordable,
              and transparent shipping — making global commerce accessible for everyone.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              We invest in technology, people, and partnerships to continuously improve
              our services and deliver an exceptional experience from booking to delivery.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <Eyebrow>What We Stand For</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-10" style={{ letterSpacing: '-0.02em' }}>
            Our core values.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map(({ title, desc }) => (
              <div key={title} className="rounded-2xl bg-neutral-50 border border-neutral-200 p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <CheckCircle size={16} weight="duotone" className="text-secondary shrink-0" />
                  <h3 className="font-bold text-primary text-sm">{title}</h3>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

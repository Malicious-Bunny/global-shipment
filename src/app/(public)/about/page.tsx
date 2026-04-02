import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Global Express Shipments',
};

const values = [
  { title: 'Speed',          desc: 'We are committed to delivering your shipments as fast as possible with express options available on all routes.' },
  { title: 'Reliability',    desc: 'With a 98%+ on-time delivery rate, you can trust us to get your goods where they need to be.' },
  { title: 'Transparency',   desc: 'Full visibility at every stage with our real-time tracking platform and proactive communication.' },
  { title: 'Safety',         desc: 'All shipments are handled with the utmost care and are fully covered by comprehensive cargo insurance.' },
  { title: 'Global Reach',   desc: 'Our network spans over 50 countries, ensuring we can reach virtually any destination worldwide.' },
  { title: 'Customer First', desc: 'Our dedicated support team is available to assist you at every step of your shipping journey.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — full-bleed image with overlay */}
      <div className="relative bg-primary overflow-hidden" style={{ minHeight: 340 }}>
        <Image
          src="/images/about-staff.jpg"
          alt="Global Express Shipments team member on deck"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="h-1 w-10 bg-secondary rounded-full mb-5" />
          <h1
            className="text-4xl sm:text-5xl font-semibold text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            About Us
          </h1>
          <p className="mt-2 text-white/60">Your trusted global logistics partner</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Who + Mission — image beside text */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center mb-20">
          <div>
            <div className="mb-4 h-px w-10 bg-secondary" />
            <h2 className="mb-4 text-2xl font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
              Who We Are
            </h2>
            <p className="mb-3 text-neutral-500 leading-relaxed">
              Global Express Shipments is a leading international courier and cargo company
              providing fast, reliable, and secure logistics solutions to businesses and
              individuals worldwide.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              With years of experience in the logistics industry, we have built a reputation
              for excellence, handling everything from small documents to complex project
              cargo with the same level of care and professionalism.
            </p>
          </div>

          {/* Container image */}
          <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/about-container.jpg"
              alt="Global Express Shipments shipping container at port"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Mission — image on left */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center mb-20">
          {/* Fleet image */}
          <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-lg order-2 lg:order-1">
            <Image
              src="/images/fleet-vehicles.jpg"
              alt="Global Express Shipments fleet of delivery vehicles"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-4 h-px w-10 bg-secondary" />
            <h2 className="mb-4 text-2xl font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
              Our Mission
            </h2>
            <p className="mb-3 text-neutral-500 leading-relaxed">
              To connect businesses and people across the world through fast, affordable,
              and transparent shipping solutions — making global commerce simple and accessible
              for everyone.
            </p>
            <p className="text-neutral-500 leading-relaxed">
              We invest in technology, people, and partnerships to continuously improve
              our services and deliver an exceptional experience from booking to delivery.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="mb-4 h-px w-10 bg-secondary" />
          <h2 className="mb-8 text-2xl font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-neutral-200 bg-surface p-5 shadow-xs border-l-2 border-l-secondary"
              >
                <h3 className="mb-2 font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
                  {title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

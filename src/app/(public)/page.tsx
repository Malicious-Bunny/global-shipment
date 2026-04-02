import Link from 'next/link';
import Image from 'next/image';
import {
  Boat, Truck, Package, PawPrint,
  Lightning, ShieldCheck, Crosshair, LockSimple,
  TrendUp, Globe, Clock, Headset,
} from '@phosphor-icons/react/dist/ssr';
import HeroSection from '@/components/public/HeroSection';
import TrackForm from '@/components/public/TrackForm';

const services = [
  { Icon: Boat,     title: 'Ocean Freight', desc: 'Cost-effective sea freight solutions for large volume shipments globally.',         image: '/images/about-container.jpg' },
  { Icon: Truck,    title: 'Road Freight',  desc: 'Reliable door-to-door road transport across the UK and Europe.',                    image: '/images/hero-truck.jpg'      },
  { Icon: Package,  title: 'Project Cargo', desc: 'Specialist handling for oversized, heavy-lift and complex cargo.',                  image: '/images/service-truck.jpg'   },
  { Icon: PawPrint, title: 'Pet Transport', desc: 'Safe, IATA-compliant transport for your beloved pets to destinations worldwide.',   image: '/images/service-pets.jpg'    },
];

const whyUs = [
  { Icon: Lightning,   title: 'Fast Delivery', desc: 'Express options available with guaranteed delivery windows.' },
  { Icon: ShieldCheck, title: 'Reliability',   desc: 'Over 98% on-time delivery rate across all shipping channels.' },
  { Icon: Crosshair,   title: 'Live Tracking', desc: 'Real-time tracking updates at every stage of the journey.' },
  { Icon: LockSimple,  title: 'Safe & Secure', desc: 'All shipments are fully insured and handled with care.' },
];

const stats = [
  { Icon: TrendUp,  value: '500+', label: 'Deliveries Completed' },
  { Icon: Globe,    value: '50+',  label: 'Countries Served'     },
  { Icon: Clock,    value: '98%',  label: 'On-Time Rate'         },
  { Icon: Headset,  value: '24/7', label: 'Customer Support'     },
];

function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="text-center mb-12">
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-secondary" />
      <h2 className="text-3xl font-semibold text-primary" style={{ fontFamily: 'var(--font-display)' }}>{title}</h2>
      <p className="mt-2 text-neutral-500 max-w-md mx-auto">{sub}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrackForm />

      {/* Services */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Services"
            sub="Comprehensive logistics solutions tailored to your needs"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {services.map(({ Icon, title, desc, image }) => (
              <div
                key={title}
                className="group bg-surface rounded-xl border border-neutral-200 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-secondary/30 transition-all duration-200 cursor-default overflow-hidden"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary">
                      <Icon size={15} weight="duotone" className="text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-white drop-shadow" style={{ fontFamily: 'var(--font-display)' }}>{title}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-surface px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors cursor-pointer"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px lg:grid-cols-4 bg-white/8 rounded-2xl overflow-hidden">
            {stats.map(({ Icon, value, label }) => (
              <div key={label} className="bg-primary flex flex-col items-center gap-3 py-10 px-6 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 border border-secondary/25">
                  <Icon size={22} weight="duotone" className="text-secondary" />
                </div>
                <div>
                  <p
                    className="text-4xl sm:text-5xl font-bold text-secondary leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {value}
                  </p>
                  <p className="mt-1.5 text-sm text-neutral-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us — image + cards side by side */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Choose Us"
            sub="We are committed to delivering excellence at every step"
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
            {/* Fleet image */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/fleet-vehicles.jpg"
                alt="Global Express Shipments fleet of delivery vehicles"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Stat badge overlay */}
              <div className="absolute bottom-4 left-4 rounded-xl bg-primary/90 backdrop-blur-sm px-4 py-3 border border-white/10">
                <p className="text-2xl font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>98%</p>
                <p className="text-xs text-neutral-400">On-Time Delivery Rate</p>
              </div>
            </div>

            {/* Why cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {whyUs.map(({ Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <Icon size={20} weight="duotone" className="text-secondary" />
                  </div>
                  <h3 className="mb-1 font-semibold text-primary text-sm" style={{ fontFamily: 'var(--font-display)' }}>{title}</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

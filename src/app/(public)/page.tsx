import Link from 'next/link';
import Image from 'next/image';
import {
  Boat, Truck, Package, PawPrint,
  Lightning, ShieldCheck, Crosshair, LockSimple,
  ArrowUpRight, ArrowRight,
} from '@phosphor-icons/react/dist/ssr';
import HeroSection from '@/components/public/HeroSection';

const services = [
  { Icon: Boat,     slug: 'ocean-freight', title: 'Ocean Freight', desc: 'Cost-effective sea freight for large volume shipments worldwide.',        image: '/images/about-container.jpg' },
  { Icon: Truck,    slug: 'road-freight',  title: 'Road Freight',  desc: 'Reliable door-to-door road transport across the UK and Europe.',          image: '/images/hero-truck.jpg'      },
  { Icon: Package,  slug: 'project-cargo', title: 'Project Cargo', desc: 'Specialist handling for oversized, heavy-lift and complex cargo.',        image: '/images/service-truck.jpg'   },
  { Icon: PawPrint, slug: 'pet-transport', title: 'Pet Transport', desc: 'Safe, IATA-compliant transport for your beloved pets worldwide.',         image: '/images/service-pets.jpg'    },
];

const whyUs = [
  { Icon: Lightning,   title: 'Express Delivery',  desc: 'Same-day and next-day options with guaranteed windows on all key routes.' },
  { Icon: ShieldCheck, title: '98% On-Time Rate',  desc: 'Consistently reliable performance across air, sea, road and rail.' },
  { Icon: Crosshair,   title: 'Live GPS Tracking', desc: 'Real-time visibility from collection through to final delivery.' },
  { Icon: LockSimple,  title: 'Fully Insured',     desc: 'Comprehensive cargo insurance on every shipment, every time.' },
];

const stats = [
  { value: '500+', label: 'Deliveries completed' },
  { value: '50+',  label: 'Countries served'     },
  { value: '98%',  label: 'On-time delivery'     },
  { value: '24/7', label: 'Customer support'     },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="h-px w-5 bg-secondary" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">{children}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <Eyebrow>What We Do</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary" style={{ letterSpacing: '-0.02em' }}>
                Global logistics,<br />every mode.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-primary transition-colors cursor-pointer shrink-0"
            >
              All services <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {services.map(({ Icon, slug, title, desc, image }) => (
              <Link
                key={title}
                href={`/services/${slug}`}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 block cursor-pointer"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover object-center opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary">
                      <Icon size={14} weight="bold" className="text-primary" />
                    </div>
                    <span className="text-sm font-bold text-white">{title}</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed line-clamp-2">{desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-secondary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Learn more <ArrowRight size={11} weight="bold" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-14 px-6 text-center">
                <span className="text-4xl sm:text-5xl font-black text-secondary leading-none" style={{ letterSpacing: '-0.03em' }}>{value}</span>
                <span className="mt-2.5 text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/fleet-vehicles.jpg"
                  alt="Global Express Shipments fleet of delivery vehicles"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-5 right-6 rounded-2xl bg-primary px-6 py-4 shadow-2xl">
                <p className="text-3xl font-black text-secondary leading-none" style={{ letterSpacing: '-0.03em' }}>98%</p>
                <p className="text-[11px] text-white/50 mt-1 tracking-wide">On-Time Delivery</p>
              </div>
            </div>
            <div>
              <Eyebrow>Why Choose Us</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4" style={{ letterSpacing: '-0.02em' }}>
                Built around<br />your shipment.
              </h2>
              <p className="text-neutral-500 mb-10 max-w-md leading-relaxed">
                We invest in technology, people, and global partnerships to deliver
                an exceptional experience from booking to final delivery.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whyUs.map(({ Icon, title, desc }) => (
                  <div key={title} className="rounded-xl bg-white border border-neutral-200 p-5 shadow-xs hover:shadow-sm transition-shadow duration-200">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10">
                      <Icon size={18} weight="duotone" className="text-secondary" />
                    </div>
                    <h3 className="text-sm font-bold text-primary mb-1">{title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <Eyebrow>Get Started</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4" style={{ letterSpacing: '-0.02em' }}>Ready to ship?</h2>
          <p className="text-neutral-500 mb-8 max-w-sm mx-auto leading-relaxed">
            Get a fast, competitive quote on any shipment — anywhere in the world.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-semibold text-primary hover:bg-secondary/85 transition-colors cursor-pointer"
            >
              Contact Us <ArrowRight size={14} weight="bold" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-primary transition-colors cursor-pointer"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

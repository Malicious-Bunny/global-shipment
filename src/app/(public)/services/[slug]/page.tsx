import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AirplaneTilt, Boat, Truck, Train, Warehouse, Package, PawPrint, CheckCircle, ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

const services = [
  {
    slug: 'air-freight',
    Icon: AirplaneTilt,
    title: 'Air Freight',
    image: null,
    tagline: 'The fastest way to ship globally.',
    desc: 'When speed matters, air freight is the answer. We work with major airlines and dedicated cargo carriers to move your goods to over 150 countries quickly and reliably — with full customs support and real-time tracking from collection to delivery.',
    features: [
      'Express & economy air options',
      'Door-to-door worldwide delivery',
      'Dangerous goods certified handling',
      'Temperature-controlled cargo',
      'Full customs clearance support',
    ],
    suitable: ['Time-sensitive documents', 'High-value electronics', 'Perishable goods', 'Emergency spare parts'],
  },
  {
    slug: 'ocean-freight',
    Icon: Boat,
    title: 'Ocean Freight',
    image: '/images/about-container.jpg',
    tagline: 'Cost-effective shipping for large volumes.',
    desc: 'Ocean freight is the most economical choice for moving large or heavy cargo internationally. We offer both Full Container Load (FCL) and Less than Container Load (LCL) options, with regular sailings from all major UK and European ports.',
    features: [
      'FCL & LCL shipments',
      'Port-to-port & door-to-door',
      'Customs clearance included',
      'Consolidation services',
      'Hazardous cargo handling',
    ],
    suitable: ['Bulk goods & raw materials', 'Retail & consumer goods', 'Heavy machinery', 'Non-urgent international cargo'],
  },
  {
    slug: 'road-freight',
    Icon: Truck,
    title: 'Road Freight',
    image: '/images/hero-truck.jpg',
    tagline: 'Fast, flexible delivery across the UK & Europe.',
    desc: 'Our road freight network covers the entire UK and Europe, offering everything from same-day courier runs to full truckload services. Every vehicle is GPS-tracked and operated by experienced drivers.',
    features: [
      'Same-day & next-day options',
      'Full & part loads available',
      'GPS-tracked fleet',
      'Temperature-controlled vehicles',
      'Scheduled collection service',
    ],
    suitable: ['Retail deliveries', 'Construction materials', 'Food & beverages', 'General palletised freight'],
  },
  {
    slug: 'rail-freight',
    Icon: Train,
    title: 'Rail Freight',
    image: null,
    tagline: 'A greener route between Europe and Asia.',
    desc: 'Rail freight offers a compelling middle ground between the speed of air and the cost of sea. We operate along established Trans-Eurasian corridors, connecting the UK and Europe to Central Asia and China with a significantly lower carbon footprint.',
    features: [
      'Trans-Eurasian rail routes',
      'Lower carbon emissions than air or road',
      'Competitive transit times (15–20 days)',
      'Suitable for heavy & bulk cargo',
      'Intermodal options available',
    ],
    suitable: ['Heavy industrial goods', 'Automotive parts', 'Consumer electronics', 'Eco-conscious shippers'],
  },
  {
    slug: 'warehousing',
    Icon: Warehouse,
    title: 'Warehousing',
    image: null,
    tagline: 'Secure, flexible storage when you need it.',
    desc: 'Our modern warehousing facilities give you the flexibility to store goods short or long-term, with full inventory visibility and fulfilment services. Whether you need overflow storage or a permanent logistics base, we have you covered.',
    features: [
      '24/7 secure facilities',
      'Real-time inventory management',
      'Pick, pack & despatch',
      'Same-day order fulfilment',
      'Short & long-term contracts',
    ],
    suitable: ['E-commerce businesses', 'Seasonal stock overflow', 'Import consolidation', 'Retail distribution'],
  },
  {
    slug: 'project-cargo',
    Icon: Package,
    title: 'Project Cargo',
    image: '/images/service-truck.jpg',
    tagline: 'Bespoke solutions for complex, oversized loads.',
    desc: 'Some cargo simply doesn\'t fit the standard mould. Our project cargo team specialises in planning and executing the transport of oversized, heavy-lift, and high-value freight — from industrial machinery to offshore equipment — anywhere in the world.',
    features: [
      'Heavy lift & out-of-gauge cargo',
      'Route surveys & special permits',
      'Multi-modal transport planning',
      'Dedicated project manager',
      'On-site supervision available',
    ],
    suitable: ['Industrial machinery', 'Power generation equipment', 'Construction plant', 'Oil & gas components'],
  },
  {
    slug: 'pet-transport',
    Icon: PawPrint,
    title: 'Pet Transport',
    image: '/images/service-pets.jpg',
    tagline: 'Safe, comfortable travel for your pets.',
    desc: 'Relocating your pet internationally is stressful — we make it simple. Our team handles everything from IATA-compliant kennels and health certificates to airline bookings and destination clearance, so your animal arrives safely and on time.',
    features: [
      'IATA-compliant kennels & carriers',
      'Health certificate & permit assistance',
      'Live animal handling specialists',
      'Door-to-door pet delivery',
      'Post-arrival welfare check',
    ],
    suitable: ['Dogs & cats', 'Exotic animals (with permits)', 'International relocation', 'Rescue & adoption transfers'],
  },
];

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: `${service.title} — Global Express Shipments` };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const { Icon, title, image, tagline, desc, features, suitable } = service;
  const idx = services.indexOf(service);
  const prev = services[idx - 1] ?? null;
  const next = services[idx + 1] ?? null;

  return (
    <>
      {/* Banner */}
      <div className="bg-background border-b border-border py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft size={13} />
            All Services
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 border border-primary/30">
              <Icon size={24} weight="duotone" className="text-primary" />
            </div>
            <div>
              <div className="h-1 w-8 bg-primary rounded-full mb-2" />
              <h1 className="text-4xl sm:text-5xl font-light text-foreground">{title}</h1>
            </div>
          </div>
          <p className="mt-3 text-muted-foreground text-base">{tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-8">

        {/* Hero image */}
        {image && (
          <div className="relative h-56 w-full rounded-xl overflow-hidden border border-border">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">{desc}</p>

        {/* Features + Suitable for */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">What&apos;s Included</h2>
            <ul className="space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle size={16} weight="duotone" className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-xs">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Suitable For</h2>
            <ul className="space-y-2.5">
              {suitable.map((s) => (
                <li key={s} className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  <span className="text-sm text-muted-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-primary/30 px-6 py-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(155,135,245,0.15) 0%, rgba(155,135,245,0.05) 100%)' }}>
          <h3 className="text-lg font-light text-foreground mb-1">Ready to ship?</h3>
          <p className="text-sm text-muted-foreground mb-5">Get in touch and we&apos;ll handle the rest.</p>
          <Link
            href="/contact"
            className="neumorphic-button relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary/40 bg-linear-to-b from-primary/25 to-primary/10 px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/70 cursor-pointer"
          >
            Contact Us
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Prev / Next */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          {prev ? (
            <Link
              href={`/services/${prev.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link
              href={`/services/${next.slug}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {next.title}
              <ArrowRight size={14} />
            </Link>
          ) : <span />}
        </div>
      </div>
    </>
  );
}

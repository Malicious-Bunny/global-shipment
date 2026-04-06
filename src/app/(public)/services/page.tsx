import Image from 'next/image';
import Link from 'next/link';
import { AirplaneTilt, Boat, Truck, Train, Warehouse, Package, PawPrint, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Services — Global Express Shipments' };

const services = [
  {
    slug: 'air-freight',
    Icon: AirplaneTilt,
    title: 'Air Freight',
    image: null,
    desc: 'Our air freight service offers the fastest way to ship goods internationally. With access to major airlines and dedicated cargo carriers, we deliver to over 150 countries with full tracking and customs support.',
    features: ['Express delivery options', 'Door-to-door service', 'Dangerous goods handling', 'Temperature-controlled cargo'],
  },
  {
    slug: 'ocean-freight',
    Icon: Boat,
    title: 'Ocean Freight',
    image: '/images/about-container.jpg',
    desc: 'Our ocean freight solutions offer a cost-effective way to ship large volumes globally. We offer FCL and LCL options with regular sailings from all major UK and European ports.',
    features: ['Full Container Load (FCL)', 'Less than Container Load (LCL)', 'Port-to-port & door-to-door', 'Customs clearance included'],
  },
  {
    slug: 'road-freight',
    Icon: Truck,
    title: 'Road Freight',
    image: '/images/hero-truck.jpg',
    desc: 'Fast and flexible road freight services covering the whole of the UK and Europe. Our fleet of vehicles handles everything from small parcels to full truckloads.',
    features: ['Same-day & next-day delivery', 'Scheduled collection service', 'Temperature-controlled vehicles', 'GPS-tracked fleet'],
  },
  {
    slug: 'rail-freight',
    Icon: Train,
    title: 'Rail Freight',
    image: null,
    desc: 'An eco-friendly and cost-effective alternative to road and air freight, our rail cargo services connect major hubs across Europe and Asia via established rail corridors.',
    features: ['Trans-Eurasian rail routes', 'Lower carbon footprint', 'Competitive transit times', 'Suitable for heavy cargo'],
  },
  {
    slug: 'warehousing',
    Icon: Warehouse,
    title: 'Warehousing',
    image: null,
    desc: 'Our modern warehousing facilities provide secure, flexible storage for your goods. We offer short and long-term solutions with full inventory management and order fulfilment.',
    features: ['24/7 secure facilities', 'Inventory management system', 'Pick & pack services', 'Same-day order fulfilment'],
  },
  {
    slug: 'project-cargo',
    Icon: Package,
    title: 'Project Cargo',
    image: '/images/service-truck.jpg',
    desc: 'We specialise in handling complex and oversized project cargo that requires bespoke logistics solutions. From industrial machinery to construction equipment, we manage it all.',
    features: ['Heavy lift & oversized cargo', 'Route surveys & permits', 'Multi-modal transport', 'Dedicated project manager'],
  },
  {
    slug: 'pet-transport',
    Icon: PawPrint,
    title: 'Pet Transport',
    image: '/images/service-pets.jpg',
    desc: 'We offer safe, comfortable, and IATA-compliant transport for your beloved pets worldwide. Our specialists handle all documentation, health certificates, and kennel requirements.',
    features: ['IATA-compliant pet kennels', 'Health certificate assistance', 'Live animal handling experts', 'Door-to-door pet delivery'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <div className="bg-background border-b border-border py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-1 w-10 bg-primary rounded-full mb-5" />
          <h1 className="text-4xl sm:text-5xl font-light text-foreground">
            Our Services
          </h1>
          <p className="mt-2 text-muted-foreground">Comprehensive logistics solutions for every need</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {services.map(({ slug, Icon, title, image, desc, features }) => (
            <div
              key={title}
              className="group rounded-xl border border-border bg-card shadow-xs hover:border-primary/40 hover:shadow-[0_0_30px_rgba(155,135,245,0.1)] transition-all duration-300 overflow-hidden flex flex-col"
            >
              {image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={image}
                    alt={`${title} — Global Express Shipments`}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/80 backdrop-blur-sm">
                      <Icon size={17} weight="duotone" className="text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium text-white drop-shadow">{title}</span>
                  </div>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                {!image && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon size={22} weight="duotone" className="text-primary" />
                    </div>
                    <h2 className="text-base font-semibold text-foreground">{title}</h2>
                  </div>
                )}
                {image && (
                  <h2 className="text-base font-semibold text-foreground mb-3">{title}</h2>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link
                    href={`/services/${slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

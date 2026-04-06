import Link from 'next/link';
import Image from 'next/image';
import {
  Truck, AirplaneTilt, Boat,
  ArrowUpRight, ArrowRight,
  Package, MapPin, CheckCircle, ClipboardText, Compass,
  FacebookLogo, InstagramLogo, TwitterLogo, LinkedinLogo,
  Star, Quotes,
} from '@phosphor-icons/react/dist/ssr';
import HeroSection from '@/components/public/HeroSection';

/* ── Data ──────────────────────────────────────────────────────── */

const services = [
  {
    num: '01',
    Icon: Truck,
    title: 'By Road',
    desc: 'Same-day and next-day road delivery across the UK and Europe with full real-time tracking.',
    href: '/services/road-freight',
  },
  {
    num: '02',
    Icon: AirplaneTilt,
    title: 'By Air',
    desc: 'Fastest international delivery to 150+ countries — fully tracked, door-to-door air freight.',
    href: '/services/air-freight',
  },
  {
    num: '03',
    Icon: Boat,
    title: 'By Sea',
    desc: 'Cost-effective ocean freight for large volumes — FCL and LCL, worldwide reach.',
    href: '/services/ocean-freight',
  },
];

const stats = [
  { value: '323K+', label: 'Deliveries'    },
  { value: '210K+', label: 'Reviews'       },
  { value: '1,247', label: 'Happy Clients' },
  { value: '64K+',  label: 'Total Routes'  },
];

const ticker = ['GES', 'Shipping', 'Delivery', 'GES', 'Shipping', 'Delivery', 'GES', 'Shipping', 'Delivery', 'GES', 'Shipping', 'Delivery'];

const howWeWork = [
  {
    num: '01',
    Icon: ClipboardText,
    title: 'Order Placement',
    desc: 'Customers submit orders online or by phone, specifying pickup, delivery details, and cargo type to initiate the process.',
  },
  {
    num: '02',
    Icon: Compass,
    title: 'Route Planning',
    desc: 'Using advanced software, optimal routes are determined considering distance, traffic conditions, and cargo priorities.',
  },
  {
    num: '03',
    Icon: Package,
    title: 'Transportation',
    desc: 'Goods are loaded into appropriate vehicles and dispatched, ensuring proper handling, safety, and schedule adherence.',
  },
  {
    num: '04',
    Icon: MapPin,
    title: 'Tracking & Monitoring',
    desc: 'Real-time tracking systems monitor shipments, providing updates to customers and enabling proactive issue management.',
  },
  {
    num: '05',
    Icon: CheckCircle,
    title: 'Delivery & Confirmation',
    desc: 'Upon arrival, goods are unloaded, verified against order details, and successful delivery is confirmed with recipients.',
  },
];

const news = [
  {
    date: '27 Feb 2025',
    title: 'Easing Cross-Border Trade And Customs In A Freer World: The GES Perspective',
    href: '/contact',
    img: '/images/hero-container-globe.jpg',
  },
  {
    date: '17 Feb 2025',
    title: 'How Real-Time Tracking Is Transforming The Global Courier Industry',
    href: '/contact',
    img: '/images/about-container.jpg',
  },
  {
    date: '05 Feb 2025',
    title: 'Road Freight Solutions For Last-Mile Delivery Challenges Across Europe',
    href: '/contact',
    img: '/images/service-truck.jpg',
  },
];

const testimonials = [
  {
    name: 'Harriet Watson',
    role: 'Director of Security',
    quote: 'GES transformed our supply chain. Real-time tracking and flawless delivery every single time.',
    initials: 'HW',
  },
  {
    name: 'Ben Parker',
    role: 'Co-Founder of Spark & Tools',
    quote: 'The most reliable courier service we have used. Their ocean freight rates are truly unbeatable.',
    initials: 'BP',
  },
  {
    name: 'Shanley Smith',
    role: 'CEO of Law and Justice Firm',
    quote: 'Outstanding professionalism. Our sensitive documents arrived on time and perfectly intact.',
    initials: 'SS',
  },
];

const socialLinks = [
  { Icon: FacebookLogo,  href: '#', label: 'Facebook'  },
  { Icon: InstagramLogo, href: '#', label: 'Instagram' },
  { Icon: TwitterLogo,   href: '#', label: 'Twitter'   },
  { Icon: LinkedinLogo,  href: '#', label: 'LinkedIn'  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Services + Description ── */}
      <section className="py-20 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-10">
            What We Offer
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: numbered service list */}
            <div className="divide-y divide-border">
              {services.map(({ num, Icon, title, desc, href }) => (
                <Link
                  key={num}
                  href={href}
                  className="group flex items-start gap-5 py-7 hover:bg-muted/50 -mx-4 px-4 rounded-xl transition-colors duration-150 cursor-pointer"
                >
                  <span className="text-xs font-bold text-neutral-300 mt-1 w-6 shrink-0">{num}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                          <Icon size={18} weight="duotone" className="text-muted-foreground" />
                        </div>
                        <h3 className="text-base font-bold text-foreground">{title}</h3>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-neutral-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 shrink-0"
                      />
                    </div>
                    <p className="text-sm text-neutral-500 leading-relaxed pl-12">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right: description + world map */}
            <div className="lg:pt-2">
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight tracking-tight mb-4">
                Transport Solutions For Business to Solve Any Delivery Problems
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                Logistics is the Process of Efficiently Moving Goods From Point A to Point B. Success
                Demands Minute Attention to Details — from Packaging to Warehousing to Transportation.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-navy px-6 py-3 text-sm font-bold text-navy hover:bg-navy hover:text-white transition-all duration-200 cursor-pointer"
              >
                More Info <ArrowUpRight size={15} />
              </Link>

              {/* World map placeholder */}
              <div className="mt-10 relative rounded-2xl overflow-hidden bg-background border border-neutral-100 h-40">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={28} weight="duotone" className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      150+ Countries Worldwide
                    </p>
                  </div>
                </div>
                {/* Decorative dots */}
                {[
                  [20, 30], [35, 45], [50, 25], [65, 50], [75, 35],
                  [42, 60], [58, 70], [80, 55], [25, 65], [90, 40],
                ].map(([l, t], i) => (
                  <div
                    key={i}
                    className="absolute h-1.5 w-1.5 rounded-full bg-primary/40"
                    style={{ left: `${l}%`, top: `${t}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats / Progress ── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Our Progress
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight tracking-tight mb-4">
                Let&rsquo;s See Our Progress
              </h2>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8 max-w-sm">
                Charting Our Course: Taking Stock of Our Journey, Embracing Growth, and Paving the Way
                Forward. Let&rsquo;s Pause, Reflect, and Renew Our Commitment to Progress.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-navy px-6 py-3 text-sm font-bold text-navy hover:bg-navy hover:text-white transition-all duration-200 cursor-pointer"
              >
                More Info <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Right: stat grid */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map(({ value, label }) => (
                <div key={label} className="bg-card rounded-2xl p-6 shadow-sm border border-neutral-100 text-center">
                  <p className="text-4xl font-black text-muted-foreground tracking-tight leading-none mb-2">{value}</p>
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker marquee ── */}
      <div className="bg-primary overflow-hidden py-3.5">
        <div className="flex animate-[marquee_28s_linear_infinite] whitespace-nowrap">
          {[...ticker, ...ticker].map((word, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-3 px-5 text-sm font-bold uppercase tracking-widest ${
                i % 3 === 0 ? 'text-white' : 'text-white/60'
              }`}
            >
              {word}
              <span className="text-white/45 text-base leading-none">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── How We Work ── */}
      <section className="py-20 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: image with badge */}
            <div className="relative">
              <div className="relative h-80 sm:h-[460px] rounded-3xl overflow-hidden bg-muted">
                <Image
                  src="/images/about-container.jpg"
                  alt="GES shipping container operations"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* On-time badge */}
              <div className="absolute -bottom-5 -right-4 bg-primary rounded-2xl px-5 py-4 shadow-xl">
                <p className="text-primary-foreground font-black text-3xl leading-none">98%</p>
                <p className="text-primary-foreground/60 text-xs font-medium mt-1">On-Time Rate</p>
              </div>
              {/* Experience badge */}
              <div className="absolute top-6 -left-4 bg-card rounded-2xl px-5 py-4 shadow-xl border border-neutral-100">
                <p className="text-foreground font-black text-3xl leading-none">10+</p>
                <p className="text-neutral-400 text-xs font-medium mt-1">Years Experience</p>
              </div>
            </div>

            {/* Right: steps */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">Process</p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight tracking-tight mb-3">
                How We Work
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed mb-10">
                Discover our streamlined logistics process that ensures efficiency and excellence at every step.
              </p>

              <div className="space-y-0">
                {howWeWork.map(({ num, Icon, title, desc }, i) => (
                  <div key={num} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Icon size={18} weight="duotone" className="text-muted-foreground" />
                      </div>
                      {i < howWeWork.length - 1 && (
                        <div className="w-px flex-1 bg-neutral-100 mt-2 min-h-[1.5rem]" />
                      )}
                    </div>
                    <div className={`${i < howWeWork.length - 1 ? 'pb-6' : 'pb-0'} pt-1.5`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{num}</span>
                        <h3 className="text-sm font-bold text-foreground">{title}</h3>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section className="py-20 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">Our Blog</p>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">Latest News</h2>
            </div>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground/75 transition-colors"
            >
              View All <ArrowRight size={14} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1">
                    <p className="text-[10px] font-semibold text-neutral-600">Published {item.date}</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-foreground leading-snug mb-3 group-hover:text-foreground transition-colors duration-150">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                    Read more <ArrowRight size={12} weight="bold" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight mb-3">
              Over 1000+ People Trust Us
            </h2>
            <p className="text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
              Real experiences from real customers — see why businesses and individuals worldwide choose GES
              for their logistics needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-neutral-100 shadow-sm relative">
                {/* Quote icon */}
                <div className="absolute top-5 right-5 opacity-10">
                  <Quotes size={32} weight="fill" className="text-muted-foreground" />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={13} weight="fill" className="text-yellow-400" />
                  ))}
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-muted-foreground font-black text-sm">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground leading-none">{t.name}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-navy px-8 py-3 text-sm font-bold text-navy hover:bg-navy hover:text-white transition-all duration-200 cursor-pointer"
            >
              Show All People <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Connect / Social ── */}
      <section className="py-14 bg-card border-t border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-1">Connect With Us</p>
              <h3 className="text-xl font-black text-foreground">Follow GES on Social Media</h3>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-neutral-500 hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer"
                >
                  <Icon size={18} weight="fill" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

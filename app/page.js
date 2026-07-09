'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Phone, Mail, MapPin, Send,
  Sparkles, Building2, Hammer, Wrench, Sofa, Compass, Layers, Home, Users,
  Star, Quote, Instagram, Linkedin, Facebook, Twitter, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

/* ============================ DATA ============================ */
const IMG = {
  hero: 'https://images.pexels.com/photos/28102352/pexels-photo-28102352.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1920',
  about: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?fm=jpg&q=80&w=1600&auto=format&fit=crop',
  cta: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?fm=jpg&q=80&w=1600&auto=format&fit=crop',
  proj1: 'https://images.unsplash.com/photo-1549856625-824ce09aefc8?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  proj2: 'https://images.unsplash.com/photo-1706024937956-7942ca3fc53f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  proj3: 'https://images.unsplash.com/photo-1605513524006-063ed6ed31e7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  proj4: 'https://images.unsplash.com/photo-1619032468883-89a84f565cba?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  proj5: 'https://images.unsplash.com/photo-1704655295066-681e61ecca6b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  proj6: 'https://images.pexels.com/photos/7512139/pexels-photo-7512139.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  proj7: 'https://images.unsplash.com/photo-1720139290909-5f05410b20c6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  proj8: 'https://images.unsplash.com/photo-1608370617870-dc99b1b44a31?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  proj9: 'https://images.unsplash.com/photo-1606836559739-7b1d9fbf8a6e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600',
  proj10: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?fm=jpg&q=80&w=1600&auto=format&fit=crop',
  proj11: 'https://images.pexels.com/photos/8092431/pexels-photo-8092431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  proj12: 'https://images.pexels.com/photos/2387675/pexels-photo-2387675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
};

const services = [
  { icon: Compass, title: 'Interior Contracting', desc: 'End-to-end turnkey interior fit-out for commercial, retail, residential and hospitality spaces across India.' },
  { icon: Building2, title: 'Commercial & Office Interiors', desc: 'Head offices, corporate lobbies, workstations, meeting rooms and lift lobbies delivered to spec.' },
  { icon: Sofa, title: 'Retail Store Fit-outs', desc: 'Premium retail interiors for fashion, jewellery, F&B and entertainment brands — Pan India rollouts.' },
  { icon: Home, title: 'Residential Projects', desc: 'Bespoke apartment, penthouse and villa interiors including civil, finishes and modern furniture.' },
  { icon: Layers, title: 'Hospital & Hotel Interiors', desc: 'Hospital wards, medical facilities, hotel lobbies and banquet interiors executed with precision.' },
  { icon: Wrench, title: 'POP, Painting & Flooring', desc: 'POP works, gypsum ceilings, painting, plastering, marble and tile flooring with modern finishes.' },
  { icon: Hammer, title: 'Brick & Block Work', desc: 'Civil brick and block work with clean, on-schedule execution for interior fit-out projects.' },
  { icon: Users, title: 'Workforce & Labour Supply', desc: 'Skilled workforce solutions and end-to-end manpower management for interior and construction projects.' },
  { icon: Sparkles, title: 'Modern Interior Finishes', desc: 'Contemporary wall, ceiling and floor finishes tailored to housing and commercial buildings.' },
];

const industries = ['Commercial', 'Retail', 'Corporate', 'Hospitality', 'Residential', 'Hospital', 'F&B', 'Entertainment'];

const projects = [
  { id: 1, title: 'Sahyadri Hospital', category: 'Hospital', location: 'Pune', area: 'Hospital Fit-out', img: IMG.proj1, desc: 'Complete interior contracting for a leading multi-specialty hospital including wards, corridors and clean rooms.' },
  { id: 2, title: 'Zen Diamond', category: 'Retail', location: 'Sky City Mall, Borivali', area: 'Jewellery Store', img: IMG.proj2, desc: 'Premium jewellery retail store with custom display cases, curated lighting and seating.' },
  { id: 3, title: 'Timezone Gamezone', category: 'Entertainment', location: 'Faridabad', area: 'Gaming Arcade', img: IMG.proj3, desc: 'Full fit-out for a large-format gaming arcade including party zones, bowling lanes and prize counter.' },
  { id: 4, title: 'Jack & Jones, Vero Moda, ONLY', category: 'Retail', location: 'Santacruz, Mumbai', area: '4,500 sq ft', img: IMG.proj4, desc: 'Turnkey retail fit-out across three flagship Bestseller brands in a single Santacruz location.' },
  { id: 5, title: 'Calvin Klein', category: 'Retail', location: 'Lower Parel, Mumbai', area: '1,200 sq ft', img: IMG.proj3, desc: 'Premium Calvin Klein Jeans store with signature branding, product displays and lighting design.' },
  { id: 6, title: 'Bestseller Head Office', category: 'Office', location: 'Andheri (Lalit Residency)', area: '4,000 sq ft', img: IMG.proj5, desc: 'Head office fit-out with workstations, meeting rooms, breakout areas and modern furniture.' },
  { id: 7, title: 'Reliable Fashions Lobby', category: 'Commercial', location: 'Airoli, MIDC, Navi Mumbai', area: '21,500 sq ft', img: IMG.proj12, desc: 'Grand commercial building entrance lobby with marble flooring, high ceilings and modern seating.' },
  { id: 8, title: 'Capgemini', category: 'Office', location: 'Airoli, Navi Mumbai', area: 'Commercial Fit-out', img: IMG.proj7, desc: 'Lift lobby and entrance lobby fit-out featuring sleek design, polished floors and contemporary lighting.' },
  { id: 9, title: 'HRX Office', category: 'Office', location: 'Juhu, Mumbai', area: 'Corporate Office', img: IMG.proj8, desc: 'Modern office interior for HRX including reception, meeting room and lounge with contemporary design.' },
  { id: 10, title: 'Marriott Hotel', category: 'Hospitality', location: 'Bilaspur', area: '1,50,000 sq ft', img: IMG.proj6, desc: 'Hotel interior contracting including grand lobby, banquet areas and marble flooring works.' },
  { id: 11, title: 'Senghani Group Penthouse', category: 'Residential', location: 'Shiv Shakti Heights, Ghatkopar', area: '5,000 sq ft', img: IMG.proj10, desc: 'Luxurious private penthouse with bespoke living, dining, bedrooms and bathroom with jacuzzi.' },
  { id: 12, title: 'Oberoi Residence', category: 'Residential', location: 'Goregaon, Mumbai', area: 'Private Residence', img: IMG.proj11, desc: 'Sophisticated residential interior including living room, dining, kitchen and bespoke bedrooms.' },
];
const projectCats = ['All', 'Retail', 'Office', 'Commercial', 'Hospitality', 'Residential', 'Hospital'];

const stats = [
  { value: 100, suffix: '+', label: 'Projects Delivered' },
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 20, suffix: '+', label: 'Cities Across India' },
  { value: 40, suffix: '+', label: 'Trusted Brands' },
];

const whyUs = [
  { title: 'Experienced Interior Contractors', desc: 'Over 15 years executing turnkey interior projects across commercial, retail, residential and hospitality segments.' },
  { title: 'Skilled Workforce Solutions', desc: 'In-house pool of trained craftsmen and end-to-end manpower management — delivered wherever your project needs it.' },
  { title: 'Pan India Project Execution', desc: 'Delivered fit-outs from Mumbai to Pune, Faridabad, Rourkela and Bilaspur — with consistent quality across geographies.' },
  { title: 'Trusted By Leading Brands', desc: 'Chosen by Capgemini, Bestseller, Calvin Klein, Jack & Jones, HRX, Marriott, Sahyadri Hospital and many more.' },
];

const process = [
  { step: '01', title: 'Consult', desc: 'Site survey, scope walkthrough and detailed BOQ preparation for your interior project.' },
  { step: '02', title: 'Plan', desc: 'Material selection, drawings sign-off, procurement scheduling and workforce planning.' },
  { step: '03', title: 'Execute', desc: 'On-site execution — civil, POP, painting, flooring, finishes and furniture installation.' },
  { step: '04', title: 'Handover', desc: 'Quality checks, snag closure and clean, on-time handover ready for occupancy.' },
];

const clients = ['CAPGEMINI', 'CALVIN KLEIN', 'JACK & JONES', 'VERO MODA', 'ONLY', 'BESTSELLER', 'TIMEZONE', 'ZEN DIAMOND', 'SAHYADRI', 'MARRIOTT', 'RELIABLE', 'HRX', 'AMANTE', 'GANDHI AUTO'];

const testimonials = [
  { name: 'Facilities Head', role: 'Bestseller Head Office, Andheri', quote: 'Raj Furniture delivered our head office fit-out on time with exceptional finish quality. Every detail matched the brief.', img: 'https://i.pravatar.cc/120?img=47' },
  { name: 'Retail Operations', role: 'Bestseller Group — Jack & Jones, Vero Moda, ONLY', quote: 'They handled our Pan-India store rollouts with consistent craft, disciplined timelines and reliable execution.', img: 'https://i.pravatar.cc/120?img=12' },
  { name: 'Project Manager', role: 'Reliable Group Commercial Lobby', quote: 'From marble flooring to POP ceilings — every element was executed exactly as specified. A trusted contractor.', img: 'https://i.pravatar.cc/120?img=32' },
];

const insights = [
  { tag: 'Retail Fit-outs', title: 'How To Plan A Turnkey Retail Store Fit-out In 8 Weeks.', date: 'May 2025', img: IMG.proj4 },
  { tag: 'Materials', title: 'POP Ceilings vs Gypsum: Choosing The Right Ceiling For Your Space.', date: 'April 2025', img: IMG.proj7 },
  { tag: 'Workforce', title: 'The Rise Of Pan-India Workforce Solutions For Interior Projects.', date: 'March 2025', img: IMG.proj9 },
];

/* ============================ HELPERS ============================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const isFloat = to % 1 !== 0;
  return <span ref={ref}>{isFloat ? val.toFixed(1) : Math.round(val)}{suffix}</span>;
}

/* ============================ NAV ============================ */
function Nav({ onQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Clients', href: '#clients' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#0B1F3A]/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <div className="leading-tight">
              <div className="font-poppins font-bold text-white text-lg tracking-wide">RAJ FURNITURE</div>
              <div className="text-[10px] text-gold tracking-[0.3em]">INERIORS · WORKFORCE</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="relative text-sm text-white/85 hover:text-gold transition-colors group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onQuote}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-navy font-semibold text-sm hover:bg-white transition-colors"
            >
              Request Quote <ArrowUpRight className="w-4 h-4" />
            </button>
            <button onClick={() => setOpen(true)} className="lg:hidden text-white p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-[#0B1F3A] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="font-poppins font-bold text-white text-xl">RAJ FURNITURE</div>
              <button onClick={() => setOpen(false)} className="text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 flex flex-col p-8 gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="text-2xl font-poppins text-white hover:text-gold"
                >
                  {l.label}
                </motion.a>
              ))}
              <button onClick={() => { setOpen(false); onQuote(); }} className="mt-6 py-4 bg-gold text-navy rounded-full font-semibold">
                Request Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================ HERO ============================ */
function Hero({ onQuote }) {
  return (
    <section id="home" className="relative h-screen min-h-[720px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 ken-burns">
          <img src={IMG.hero} alt="Raj Furniture Interiors" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/70 via-[#0B1F3A]/55 to-[#0B1F3A]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,31,58,0.6)_100%)]" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-3 mb-8 self-start"
        >
          <div className="h-px w-12 bg-gold" />
          <span className="text-gold text-xs tracking-[0.4em] uppercase">Leading interior contractors · pan india</span>
        </motion.div>

        <h1 className="font-poppins font-bold text-white text-[clamp(2.5rem,6.5vw,6rem)] leading-[1.02] tracking-tight max-w-5xl">
          {['RAJ', 'FURNITURE'].map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {i === 1 ? <span className="italic font-light text-gradient-gold">{w}</span> : w}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
            className="block text-white/70 text-[clamp(1.25rem,2.2vw,2rem)] font-light mt-4"
          >
            Interiors · Contracting · Workforce.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="mt-8 text-white/70 text-lg max-w-2xl leading-relaxed"
        >
          Leading Interior Contractors & Workforce Providers for Commercial, Retail, Residential, Hospitality and Corporate Projects Across India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a href="#projects" className="group inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-white transition-all shadow-2xl shadow-black/30">
            View Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="px-8 py-4 border border-white/25 text-white rounded-full hover:bg-white/10 transition-all backdrop-blur-md inline-flex items-center gap-2">
            Contact Us <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-gold">
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>

      {/* Bottom stat strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 glass border-t border-gold/20">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="font-poppins text-3xl md:text-4xl font-bold text-gold">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/60 text-xs md:text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ ABOUT ============================ */
function About() {
  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative">
            <img src={IMG.about} alt="About Raj Furniture" className="w-full h-[600px] object-cover rounded-sm" />
            <div className="absolute -bottom-8 -right-8 bg-navy text-white p-8 rounded-sm max-w-xs hidden md:block">
              <div className="text-gold text-5xl font-poppins font-bold">15<span className="text-2xl">+ yrs</span></div>
              <div className="text-white/70 text-sm mt-2">of interior contracting and workforce solutions across India.</div>
            </div>
            <div className="absolute top-6 left-6 w-24 h-24 border-2 border-gold rounded-full hidden md:block" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">About Raj Furniture</span>
            </div>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-navy leading-tight">
              Interior <span className="italic font-light text-gold">contractors</span> & workforce <span className="italic font-light text-gold">experts</span>.
            </h2>
            <p className="mt-6 text-[#666666] text-lg leading-relaxed">
              Raj Furniture is a leading workforce provider and interior contractor for commercial companies across India. We deliver end-to-end manpower solutions and manage on-site workforces to ensure maximum efficiency — with specialised expertise in interior works, brick & block work, POP, painting, plastering, marble & tile flooring and modern interior finishes for housing and commercial buildings.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                'Interior Contracting',
                'Workforce Solutions',
                'Commercial Interiors',
                'Residential Interiors',
                'Retail Store Fit-outs',
                'Office Interiors',
                'POP Works',
                'Painting',
                'Brick & Block Work',
                'Marble & Tile Flooring',
              ].map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="text-[#222222] font-medium text-sm">{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-6">
              <a href="#services" className="inline-flex items-center gap-2 text-navy font-semibold group">
                Explore our services
                <span className="w-10 h-10 rounded-full border border-navy flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ SERVICES ============================ */
function Services() {
  return (
    <section id="services" className="py-28 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-gold" />
                <span className="text-gold text-xs tracking-[0.4em] uppercase">Our Services</span>
              </div>
              <h2 className="font-poppins text-4xl md:text-5xl font-bold text-navy leading-tight max-w-2xl">
                Nine disciplines. <span className="italic font-light text-gold">One trusted contractor.</span>
              </h2>
            </div>
            <p className="text-[#666666] max-w-md">
              From interior fit-outs to workforce supply — Raj Furniture executes every element of your project under a single accountable team.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="group relative bg-white p-8 h-full rounded-sm border border-black/5 hover:border-gold transition-all duration-500 hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gold/0 group-hover:to-gold/5 transition-all" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-sm bg-navy flex items-center justify-center group-hover:bg-gold transition-colors mb-6">
                    <s.icon className="w-6 h-6 text-gold group-hover:text-navy" />
                  </div>
                  <div className="text-[10px] tracking-[0.3em] text-gold mb-2">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-poppins font-bold text-2xl text-navy mb-3">{s.title}</h3>
                  <p className="text-[#666666] leading-relaxed text-sm">{s.desc}</p>
                  <div className="mt-6 pt-6 border-t border-black/5 flex items-center justify-between">
                    <span className="text-xs tracking-widest text-navy/50">LEARN MORE</span>
                    <ArrowUpRight className="w-5 h-5 text-navy group-hover:text-gold group-hover:rotate-45 transition-all" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Industries */}
        <Reveal>
          <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Industries Served</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h3 className="font-poppins text-3xl md:text-4xl font-bold text-navy mb-10">Every sector. Every scale.</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((ind) => (
                <span key={ind} className="px-6 py-3 border border-navy/15 rounded-full text-navy hover:bg-navy hover:text-gold hover:border-navy transition-all cursor-default text-sm font-medium">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ PROJECTS ============================ */
function Projects() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,164,93,0.08),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-gold" />
                <span className="text-gold text-xs tracking-[0.4em] uppercase">Featured Projects</span>
              </div>
              <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
                Signature spaces, <span className="italic font-light text-gold">delivered end-to-end.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {projectCats.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-5 py-2 rounded-full text-sm transition-all ${
                    filter === c ? 'bg-gold text-navy font-semibold' : 'border border-white/15 text-white/70 hover:border-gold hover:text-gold'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.a
                layout
                key={p.id}
                href="#contact"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-sm cursor-pointer bg-black"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.4s] ease-out" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-navy text-[10px] tracking-widest font-bold rounded-full">
                  {p.category.toUpperCase()}
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-gold transition-all">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-navy" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white/60 text-xs tracking-widest mb-2">{p.location} · {p.area}</div>
                  <h3 className="font-poppins text-2xl font-bold text-white group-hover:text-gold transition-colors">{p.title}</h3>
                  <p className="text-white/70 text-xs mt-2 line-clamp-2">{p.desc}</p>
                  <div className="h-px w-0 group-hover:w-16 bg-gold mt-3 transition-all duration-500" />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        <Reveal>
          <div className="mt-14 text-center">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 border border-gold text-gold rounded-full hover:bg-gold hover:text-navy transition-all font-medium">
              Discuss Your Project <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ WHY US + PROCESS ============================ */
function WhyUs() {
  return (
    <section className="py-28 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-14">
        <Reveal className="lg:col-span-2">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase">Why Raj Furniture</span>
          </div>
          <h2 className="font-poppins text-4xl md:text-5xl font-bold text-navy leading-tight">
            Trusted by leading brands, <span className="italic font-light text-gold">across India.</span>
          </h2>
          <p className="mt-6 text-[#666666] leading-relaxed">
            When the brief is bold and the deadline is real, brands choose the contractor that owns every square foot — civil, POP, painting, flooring, finishes and workforce.
          </p>
          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-3">
              {[47, 12, 32, 5, 8].map((n) => (
                <img key={n} src={`https://i.pravatar.cc/60?img=${n}`} className="w-11 h-11 rounded-full border-2 border-white" alt="" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold" />)}
              </div>
              <div className="text-xs text-navy/60">Trusted by 40+ leading Indian brands</div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-3 space-y-4">
          {whyUs.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="group bg-white p-8 rounded-sm border border-black/5 hover:border-gold hover:shadow-xl transition-all">
                <div className="flex items-start gap-6">
                  <div className="font-poppins text-5xl font-bold text-gold/25 group-hover:text-gold transition-colors">0{i + 1}</div>
                  <div>
                    <h3 className="font-poppins font-bold text-xl text-navy mb-2">{w.title}</h3>
                    <p className="text-[#666666] leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="max-w-7xl mx-auto px-6 mt-28">
        <Reveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Our Process</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-navy">Four steps. Zero surprises.</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="absolute top-8 left-[12%] right-[12%] h-px bg-gold/30 hidden md:block" />
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08}>
              <div className="relative text-center bg-[#F8F9FA] pt-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-navy flex items-center justify-center relative z-10 border-4 border-[#F8F9FA]">
                  <span className="font-poppins font-bold text-gold">{p.step}</span>
                </div>
                <h3 className="font-poppins font-bold text-navy text-xl mt-5">{p.title}</h3>
                <p className="text-[#666666] text-sm mt-2 max-w-xs mx-auto">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ CLIENTS ============================ */
function Clients() {
  return (
    <section id="clients" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Our Clients</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h3 className="font-poppins text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">Chosen by India’s most ambitious brands.</h3>
            <p className="text-navy/60 max-w-2xl mx-auto">From global fashion houses and gaming arcades to hospitals, hotels and Fortune 500 offices — leading brands trust Raj Furniture for turnkey interior execution.</p>
          </div>
        </Reveal>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex marquee-track whitespace-nowrap">
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="mx-10 font-poppins font-bold text-2xl md:text-3xl text-navy/25 hover:text-navy transition-colors tracking-widest">{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ TESTIMONIALS ============================ */
function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="py-28 gradient-navy relative overflow-hidden">
      <Quote className="absolute top-10 left-10 w-40 h-40 text-gold/5" />
      <Quote className="absolute bottom-10 right-10 w-40 h-40 text-gold/5 rotate-180" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs tracking-[0.4em] uppercase">Client Feedback</span>
            <div className="h-px w-10 bg-gold" />
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="font-poppins text-2xl md:text-4xl text-white leading-snug italic font-light"
          >
            “{t.quote}”
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-10 flex flex-col items-center gap-3">
          <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full border-2 border-gold" />
          <div>
            <div className="font-poppins font-bold text-white">{t.name}</div>
            <div className="text-gold text-sm">{t.role}</div>
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1 rounded-full transition-all ${idx === i ? 'w-12 bg-gold' : 'w-6 bg-white/20'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ INSIGHTS ============================ */
function Insights() {
  return (
    <section id="insights" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-gold" />
                <span className="text-gold text-xs tracking-[0.4em] uppercase">Latest Insights</span>
              </div>
              <h2 className="font-poppins text-4xl md:text-5xl font-bold text-navy leading-tight">Ideas from the site floor.</h2>
            </div>
            <a href="#insights" className="text-navy font-semibold inline-flex items-center gap-2 hover:text-gold">View all articles <ArrowRight className="w-4 h-4" /></a>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {insights.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.08}>
              <article className="group cursor-pointer">
                <div className="overflow-hidden rounded-sm mb-5 aspect-[4/3]">
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="flex items-center gap-3 text-xs mb-3">
                  <span className="px-3 py-1 bg-gold/10 text-gold rounded-full font-medium tracking-wide">{n.tag}</span>
                  <span className="text-navy/50">{n.date}</span>
                </div>
                <h3 className="font-poppins font-bold text-xl text-navy leading-snug group-hover:text-gold transition-colors">
                  {n.title}
                </h3>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-navy group-hover:text-gold transition-colors">
                  Read article <ArrowRight className="w-4 h-4" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ CTA + CONTACT ============================ */
function CTAContact({ onQuote }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill your name, email and message.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast.success(data.message || 'Message sent!');
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CTA Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.cta} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/85" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Let’s Build</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h2 className="font-poppins text-5xl md:text-6xl font-bold text-white leading-tight">
              Have a project in mind? <br /><span className="italic font-light text-gradient-gold">Let’s build it right.</span>
            </h2>
            <p className="mt-6 text-white/70 max-w-xl mx-auto">
              Talk to our team about your next interior fit-out or workforce requirement. Clear scope, honest timelines, quality execution.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onQuote} className="px-8 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-white transition-all">
                Request a Quote
              </button>
              <a href="#contact" className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all">
                Contact Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-28 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Contact</span>
            </div>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-navy leading-tight">
              Start the conversation.
            </h2>
            <p className="mt-4 text-[#666666] leading-relaxed">
              Tell us about your project. Our team will respond promptly with next steps.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { icon: MapPin, label: 'Office', value: 'B-901, TW Garden, Thakur Village, Opp. Thakur Public School, Kandivali (East), Mumbai, Maharashtra – 401107' },
                { icon: Phone, label: 'Call', value: '+91 98198 01107' },
                { icon: Mail, label: 'Email', value: 'Rajfurniture99@gmail.com' },
                { icon: Sparkles, label: 'GST', value: '27ANYPG9814F2ZF' },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-sm bg-navy flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-xs tracking-widest text-navy/50 uppercase">{c.label}</div>
                    <div className="text-navy font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map */}
            <div className="mt-8 rounded-sm overflow-hidden border border-black/10">
              <iframe
                title="Raj Furniture Location"
                src="https://www.google.com/maps?q=Thakur+Village+Kandivali+East+Mumbai+401107&output=embed"
                width="100%"
                height="220"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-8 pt-6 border-t border-black/10 flex items-center gap-4">
              {[Instagram, Linkedin, Facebook, Twitter].map((Ic, i) => (
                <a key={i} href="#" className="w-11 h-11 rounded-full border border-navy/15 flex items-center justify-center text-navy hover:bg-navy hover:text-gold hover:border-navy transition-all">
                  <Ic className="w-4 h-4" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form onSubmit={submit} className="bg-white p-8 md:p-10 rounded-sm shadow-2xl shadow-navy/5 border border-black/5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs tracking-widest text-navy/60 uppercase">Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-navy/60 uppercase">Email *</label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-navy/60 uppercase">Phone</label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" placeholder="+91" />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-navy/60 uppercase">Company</label>
                  <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" placeholder="Your company" />
                </div>
              </div>
              <div className="mt-5">
                <label className="text-xs tracking-widest text-navy/60 uppercase">Project Brief *</label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="mt-2 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0 resize-none" placeholder="Tell us about your space, scope and location…" />
              </div>
              <Button type="submit" disabled={loading} className="mt-8 w-full h-14 bg-navy hover:bg-gold hover:text-navy text-white rounded-full font-semibold text-base group transition-all">
                {loading ? 'Sending…' : (<>Send Message <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>)}
              </Button>
              <p className="mt-4 text-xs text-navy/50 text-center">We reply to every enquiry promptly during business hours.</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ============================ FOOTER ============================ */
function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const subscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const r = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Failed');
      toast.success(d.message);
      setEmail('');
    } catch (err) { toast.error(err.message); } finally { setLoading(false); }
  };
  return (
    <footer className="bg-navy pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,164,93,0.08),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <div>
                <div className="font-poppins font-bold text-white text-xl">RAJ FURNITURE</div>
                <div className="text-[10px] text-gold tracking-[0.3em]">INTERIORS · WORKFORCE</div>
              </div>
            </div>
            <p className="mt-6 text-white/60 max-w-sm leading-relaxed">
              Leading interior contractors and workforce providers for commercial, retail, residential, hospital and corporate projects across India.
            </p>
            <div className="mt-6 space-y-2 text-white/60 text-sm">
              <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /><span>B-901, TW Garden, Thakur Village, Kandivali (E), Mumbai – 401107</span></div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /><span>+91 98198 01107</span></div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /><span>Rajfurniture99@gmail.com</span></div>
            </div>
            <form onSubmit={subscribe} className="mt-6 flex">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email for updates" className="flex-1 bg-white/5 border border-white/10 border-r-0 rounded-l-full px-5 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold" />
              <button disabled={loading} className="bg-gold text-navy px-5 rounded-r-full font-semibold text-sm hover:bg-white transition-colors">
                {loading ? '…' : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>

          {[
            { title: 'Company', links: ['About', 'Services', 'Projects', 'Clients', 'Contact'] },
            { title: 'Services', links: ['Interior Contracting', 'Commercial Interiors', 'Retail Fit-outs', 'POP & Painting', 'Workforce Supply'] },
            { title: 'Sectors', links: ['Corporate', 'Retail', 'Residential', 'Hospitality', 'Hospital'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-poppins font-bold text-white mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-white/60 hover:text-gold text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} Raj Furniture. All rights reserved. · GST: 27ANYPG9814F2ZF</p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/919819801107" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </footer>
  );
}

/* ============================ QUOTE MODAL ============================ */
function QuoteModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    projectType: '', location: '', area: '', budget: '', timeline: '', description: '',
  });

  const upd = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const next = () => {
    if (step === 1 && (!form.name || !form.email)) { toast.error('Name and email required'); return; }
    if (step === 2 && !form.projectType) { toast.error('Select a project type'); return; }
    setStep((s) => Math.min(s + 1, 3));
  };
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Failed');
      toast.success(d.message);
      onClose();
      setStep(1);
      setForm({ name: '', company: '', email: '', phone: '', projectType: '', location: '', area: '', budget: '', timeline: '', description: '' });
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  const projTypes = ['Commercial Office', 'Retail Store', 'Residential', 'Hospital', 'Hotel', 'Workforce Supply'];
  const budgets = ['< ₹10 Lakh', '₹10L – ₹50L', '₹50L – ₹1 Cr', '₹1 Cr – ₹5 Cr', '₹5 Cr+'];
  const timelines = ['ASAP', '1-3 months', '3-6 months', '6-12 months', 'Flexible'];

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
            className="relative bg-white rounded-sm w-full max-w-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
            <div className="p-8 md:p-10">
              <div className="text-gold text-xs tracking-[0.4em] uppercase mb-2">Request Quote — Step {step} of 3</div>
              <h3 className="font-poppins text-3xl font-bold text-navy">Let’s scope your project.</h3>
              <div className="mt-4 flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-gold' : 'bg-black/10'}`} />
                ))}
              </div>

              <div className="mt-8">
                {step === 1 && (
                  <div className="grid md:grid-cols-2 gap-5">
                    {[
                      ['name', 'Your name *'], ['company', 'Company'], ['email', 'Email *'], ['phone', 'Phone']
                    ].map(([k, l]) => (
                      <div key={k}>
                        <label className="text-xs tracking-widest text-navy/60 uppercase">{l}</label>
                        <Input value={form[k]} onChange={(e) => upd(k, e.target.value)} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" />
                      </div>
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs tracking-widest text-navy/60 uppercase">Project Type *</label>
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {projTypes.map((p) => (
                          <button key={p} type="button" onClick={() => upd('projectType', p)} className={`px-3 py-3 text-sm rounded-sm border transition-all ${form.projectType === p ? 'bg-navy text-gold border-navy' : 'border-black/15 text-navy hover:border-gold'}`}>
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-xs tracking-widest text-navy/60 uppercase">Location</label>
                        <Input value={form.location} onChange={(e) => upd('location', e.target.value)} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" placeholder="City, State" />
                      </div>
                      <div>
                        <label className="text-xs tracking-widest text-navy/60 uppercase">Area (sq ft)</label>
                        <Input value={form.area} onChange={(e) => upd('area', e.target.value)} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" placeholder="e.g. 4,500" />
                      </div>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs tracking-widest text-navy/60 uppercase">Budget Range</label>
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {budgets.map((b) => (
                          <button key={b} type="button" onClick={() => upd('budget', b)} className={`px-3 py-3 text-sm rounded-sm border transition-all ${form.budget === b ? 'bg-navy text-gold border-navy' : 'border-black/15 text-navy hover:border-gold'}`}>
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs tracking-widest text-navy/60 uppercase">Timeline</label>
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {timelines.map((t) => (
                          <button key={t} type="button" onClick={() => upd('timeline', t)} className={`px-3 py-3 text-sm rounded-sm border transition-all ${form.timeline === t ? 'bg-navy text-gold border-navy' : 'border-black/15 text-navy hover:border-gold'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs tracking-widest text-navy/60 uppercase">Project Description</label>
                      <Textarea value={form.description} onChange={(e) => upd('description', e.target.value)} rows={4} className="mt-2 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0 resize-none" placeholder="Scope, must-haves, constraints…" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button onClick={back} disabled={step === 1} className="text-navy/60 hover:text-navy disabled:opacity-30 text-sm">← Back</button>
                {step < 3 ? (
                  <button onClick={next} className="px-8 py-3 bg-navy text-white rounded-full font-semibold hover:bg-gold hover:text-navy transition-all inline-flex items-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={submit} disabled={loading} className="px-8 py-3 bg-gold text-navy rounded-full font-semibold hover:bg-navy hover:text-gold transition-all inline-flex items-center gap-2">
                    {loading ? 'Sending…' : 'Submit Request'} <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================ SCROLL PROGRESS ============================ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return <motion.div style={{ width }} className="fixed top-0 left-0 h-[2px] bg-gold z-[100]" />;
}

/* ============================ APP ============================ */
function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  return (
    <main className="relative">
      <ScrollProgress />
      <Nav onQuote={() => setQuoteOpen(true)} />
      <Hero onQuote={() => setQuoteOpen(true)} />
      <About />
      <Services />
      <Projects />
      <WhyUs />
      <Clients />
      <Testimonials />
      <Insights />
      <CTAContact onQuote={() => setQuoteOpen(true)} />
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </main>
  );
}

export default App;

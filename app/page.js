'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X, Phone, Mail, MapPin, Send,
  Sparkles, Building2, Hammer, Wrench, Sofa, Compass, Layers, Award, Users, Trophy,
  Star, Quote, Play, Instagram, Linkedin, Facebook, Twitter, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

/* ============================ DATA ============================ */
const IMG = {
  hero: 'https://images.pexels.com/photos/29499560/pexels-photo-29499560.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1920',
  about: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?fm=jpg&q=80&w=1600&auto=format&fit=crop',
  cta: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?fm=jpg&q=80&w=1600&auto=format&fit=crop',
  proj1: 'https://images.pexels.com/photos/8092431/pexels-photo-8092431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  proj2: 'https://images.pexels.com/photos/7512139/pexels-photo-7512139.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  proj3: 'https://images.pexels.com/photos/28102352/pexels-photo-28102352.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  proj4: 'https://images.pexels.com/photos/2387675/pexels-photo-2387675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  proj5: 'https://images.pexels.com/photos/31071253/pexels-photo-31071253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200',
  proj6: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897?fm=jpg&q=80&w=1600&auto=format&fit=crop',
};

const services = [
  { icon: Compass, title: 'Interior Design', desc: 'Bespoke concepts that translate brand into space — material palettes, lighting, spatial storytelling.' },
  { icon: Layers, title: 'Design & Build', desc: 'End-to-end turnkey delivery under one accountable roof — from sketch to handover.' },
  { icon: Hammer, title: 'General Contracting', desc: 'Precision execution with certified partners, rigorous QA and predictable timelines.' },
  { icon: Wrench, title: 'MEP Services', desc: 'Integrated mechanical, electrical and plumbing engineered for efficiency and longevity.' },
  { icon: Sofa, title: 'Furniture Solutions', desc: 'Curated and custom furniture programs sourced globally to match your workflow.' },
  { icon: Building2, title: 'Workspace Strategy', desc: 'Data-led occupancy planning and change management that unlocks productivity.' },
];

const industries = ['Corporate', 'Hospitality', 'Retail', 'Healthcare', 'Education', 'Residential', 'F&B', 'Aviation'];

const projects = [
  { id: 1, title: 'Meridian Tower HQ', category: 'Corporate', location: 'Dubai, UAE', area: '38,000 sq ft', img: IMG.proj1 },
  { id: 2, title: 'The Aurelia Hotel', category: 'Hospitality', location: 'Doha, Qatar', area: '52,000 sq ft', img: IMG.proj2 },
  { id: 3, title: 'Solstice Lounge', category: 'Hospitality', location: 'Riyadh, KSA', area: '9,400 sq ft', img: IMG.proj3 },
  { id: 4, title: 'Nova Bistro', category: 'F&B', location: 'Abu Dhabi, UAE', area: '4,200 sq ft', img: IMG.proj4 },
  { id: 5, title: 'Atrium Boardroom', category: 'Corporate', location: 'Muscat, Oman', area: '2,800 sq ft', img: IMG.proj5 },
  { id: 6, title: 'Skyline Penthouse', category: 'Residential', location: 'Dubai Marina', area: '11,600 sq ft', img: IMG.proj6 },
];
const projectCats = ['All', 'Corporate', 'Hospitality', 'F&B', 'Residential'];

const stats = [
  { value: 480, suffix: '+', label: 'Projects Delivered' },
  { value: 22, suffix: '', label: 'Years of Craft' },
  { value: 6.4, suffix: 'M sq ft', label: 'Built & Fitted' },
  { value: 98, suffix: '%', label: 'Client Retention' },
];

const whyUs = [
  { title: 'Single-Point Accountability', desc: 'One team, one contract, one number to call — design, build, MEP and FF&E under one roof.' },
  { title: 'Certified Engineering', desc: 'LEED, WELL and ISO-compliant delivery with in-house MEP and structural coordination.' },
  { title: 'Uncompromising Craft', desc: 'Master craftsmen and vetted global supply lines producing showroom-grade finishes.' },
  { title: 'On-Time. On-Budget.', desc: 'Milestone-based delivery with a 98% on-time record across 480+ completed programs.' },
];

const process = [
  { step: '01', title: 'Discover', desc: 'Immersion workshops to map brand, workflow and ambition.' },
  { step: '02', title: 'Design', desc: 'Concept, spatial planning and photoreal 3D storytelling.' },
  { step: '03', title: 'Detail', desc: 'BOQ, MEP coordination, procurement and value engineering.' },
  { step: '04', title: 'Deliver', desc: 'Site execution with weekly reviews, QA/QC and snag-free handover.' },
];

const clients = ['ARAMCO', 'EMIRATES', 'HSBC', 'NEOM', 'ACCENTURE', 'MERIDIAN', 'ROSHN', 'DAMAC', 'MUBADALA', 'ETIHAD'];

const testimonials = [
  { name: 'Farah Al-Mansouri', role: 'CFO, Meridian Group', quote: 'Aureon rebuilt our headquarters in 14 weeks without a single missed milestone. The space now defines our culture.', img: 'https://i.pravatar.cc/120?img=47' },
  { name: 'David Reinhardt', role: 'GM, Aurelia Hotels', quote: 'The most disciplined design-build partner we\u2019ve engaged across three continents. Genuinely world-class craft.', img: 'https://i.pravatar.cc/120?img=12' },
  { name: 'Priya Nair', role: 'Head of Workplace, HSBC', quote: 'They didn\u2019t just build a floor — they engineered a productivity uplift. Our engagement scores moved 18 points.', img: 'https://i.pravatar.cc/120?img=32' },
];

const insights = [
  { tag: 'Workplace', title: 'The Hybrid Office Is Dead. Long Live The Magnetic Office.', date: 'May 2025', img: IMG.proj1 },
  { tag: 'Materials', title: 'Beyond Marble: The Next Generation Of Luxury Surfaces.', date: 'April 2025', img: IMG.proj3 },
  { tag: 'Sustainability', title: 'How LEED Platinum Pays For Itself In 3.4 Years.', date: 'March 2025', img: IMG.proj6 },
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
    { label: 'Insights', href: '#insights' },
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
              <div className="font-poppins font-bold text-white text-lg tracking-wide">AUREON</div>
              <div className="text-[10px] text-gold tracking-[0.3em]">DESIGN · BUILD</div>
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
              <div className="font-poppins font-bold text-white text-xl">AUREON</div>
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
          <img src={IMG.hero} alt="Luxury Interior" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/70 via-[#0B1F3A]/50 to-[#0B1F3A]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,31,58,0.6)_100%)]" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-3 mb-8 self-start"
        >
          <div className="h-px w-12 bg-gold" />
          <span className="text-gold text-xs tracking-[0.4em] uppercase">Award-winning design & build studio</span>
        </motion.div>

        <h1 className="font-poppins font-bold text-white text-[clamp(2.5rem,6.5vw,6rem)] leading-[1.02] tracking-tight max-w-5xl">
          {['Designing', 'Inspiring', 'Workspaces'].map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {w === 'Inspiring' ? <span className="italic font-light text-gradient-gold">{w}</span> : w}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
            className="block text-white/70 text-[clamp(1.25rem,2.2vw,2rem)] font-light mt-4"
          >
            That transform businesses.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="mt-8 text-white/70 text-lg max-w-xl leading-relaxed"
        >
          Aureon is a premium turnkey Interior Design & Build partner — crafting corporate, hospitality and lifestyle spaces that command presence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <button onClick={onQuote} className="group inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-white transition-all shadow-2xl shadow-black/30">
            Get Free Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={onQuote} className="px-8 py-4 border border-white/25 text-white rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
            Request a Quote
          </button>
          <a href="#projects" className="px-8 py-4 text-white hover:text-gold transition-colors inline-flex items-center gap-2">
            Explore Projects <ArrowUpRight className="w-4 h-4" />
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
            <img src={IMG.about} alt="About Aureon" className="w-full h-[600px] object-cover rounded-sm" />
            <div className="absolute -bottom-8 -right-8 bg-navy text-white p-8 rounded-sm max-w-xs hidden md:block">
              <div className="text-gold text-5xl font-poppins font-bold">22<span className="text-2xl">yrs</span></div>
              <div className="text-white/70 text-sm mt-2">of shaping the spaces where the world does its best work.</div>
            </div>
            <div className="absolute top-6 left-6 w-24 h-24 border-2 border-gold rounded-full hidden md:block" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">About Aureon</span>
            </div>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-navy leading-tight">
              A studio built on <span className="italic font-light text-gold">craft</span>, engineered for <span className="italic font-light text-gold">scale</span>.
            </h2>
            <p className="mt-6 text-[#666666] text-lg leading-relaxed">
              Founded in 2003, Aureon is a design-led, build-driven firm delivering fully integrated interior programs across the GCC, MENA and Southeast Asia. From boutique boardrooms to 100,000 sq ft headquarters — our multidisciplinary team of 180+ designers, engineers and craftsmen deliver with uncompromising precision.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-5">
              {['Turnkey Delivery', 'LEED & WELL Certified', 'ISO 9001 : 2015', 'In-house MEP Team'].map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="text-[#222222] font-medium">{f}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-6">
              <a href="#services" className="inline-flex items-center gap-2 text-navy font-semibold group">
                Discover our services
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
                Six disciplines. <span className="italic font-light text-gold">One accountable team.</span>
              </h2>
            </div>
            <p className="text-[#666666] max-w-md">
              From first sketch to final snag — we operate as a single, seamless studio so nothing gets lost between disciplines.
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
                  <div className="text-[10px] tracking-[0.3em] text-gold mb-2">0{i + 1}</div>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-gold text-navy text-[10px] tracking-widest font-bold rounded-full">
                  {p.category.toUpperCase()}
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-gold transition-all">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-navy" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white/60 text-xs tracking-widest mb-2">{p.location} · {p.area}</div>
                  <h3 className="font-poppins text-2xl font-bold text-white group-hover:text-gold transition-colors">{p.title}</h3>
                  <div className="h-px w-0 group-hover:w-16 bg-gold mt-3 transition-all duration-500" />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        <Reveal>
          <div className="mt-14 text-center">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 border border-gold text-gold rounded-full hover:bg-gold hover:text-navy transition-all font-medium">
              View Full Portfolio <ArrowRight className="w-4 h-4" />
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
            <span className="text-gold text-xs tracking-[0.4em] uppercase">Why Aureon</span>
          </div>
          <h2 className="font-poppins text-4xl md:text-5xl font-bold text-navy leading-tight">
            Chosen by boards, <span className="italic font-light text-gold">trusted by builders.</span>
          </h2>
          <p className="mt-6 text-[#666666] leading-relaxed">
            When the brief is bold and the deadline is real, clients choose the team that owns every square foot. That’s us.
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
              <div className="text-xs text-navy/60">Trusted by 200+ Fortune brands</div>
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
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Trusted Clients</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <p className="text-navy/60 max-w-lg mx-auto">The world’s most ambitious brands trust Aureon to build the spaces where their future happens.</p>
          </div>
        </Reveal>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex marquee-track whitespace-nowrap">
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="mx-12 font-poppins font-bold text-3xl text-navy/25 hover:text-navy transition-colors tracking-widest">{c}</div>
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
            <span className="text-gold text-xs tracking-[0.4em] uppercase">Testimonials</span>
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
              <h2 className="font-poppins text-4xl md:text-5xl font-bold text-navy leading-tight">Ideas shaping the spaces of tomorrow.</h2>
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
              Have a space in mind? <br /><span className="italic font-light text-gradient-gold">Let’s make it iconic.</span>
            </h2>
            <p className="mt-6 text-white/70 max-w-xl mx-auto">
              Book a 30-minute discovery call with a senior designer. Zero obligation, full clarity on scope, budget and timeline.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onQuote} className="px-8 py-4 bg-gold text-navy font-semibold rounded-full hover:bg-white transition-all">
                Request a Quote
              </button>
              <a href="#contact" className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all">
                Talk to a Designer
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
              Tell us about your brief. A senior partner will respond within 24 hours.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { icon: MapPin, label: 'Studio', value: 'Level 32, Emirates Towers, Sheikh Zayed Rd, Dubai' },
                { icon: Phone, label: 'Call', value: '+971 4 123 4567' },
                { icon: Mail, label: 'Email', value: 'hello@aureon.studio' },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-sm bg-navy flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-xs tracking-widest text-navy/50 uppercase">{c.label}</div>
                    <div className="text-navy font-medium">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-black/10 flex items-center gap-4">
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
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" placeholder="+971" />
                </div>
                <div>
                  <label className="text-xs tracking-widest text-navy/60 uppercase">Company</label>
                  <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" placeholder="Your company" />
                </div>
              </div>
              <div className="mt-5">
                <label className="text-xs tracking-widest text-navy/60 uppercase">Project Brief *</label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="mt-2 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0 resize-none" placeholder="Tell us about your space, scope and ambition…" />
              </div>
              <Button type="submit" disabled={loading} className="mt-8 w-full h-14 bg-navy hover:bg-gold hover:text-navy text-white rounded-full font-semibold text-base group transition-all">
                {loading ? 'Sending…' : (<>Send Message <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>)}
              </Button>
              <p className="mt-4 text-xs text-navy/50 text-center">We reply to every serious enquiry within one business day.</p>
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
                <div className="font-poppins font-bold text-white text-xl">AUREON</div>
                <div className="text-[10px] text-gold tracking-[0.3em]">DESIGN · BUILD</div>
              </div>
            </div>
            <p className="mt-6 text-white/60 max-w-sm leading-relaxed">
              A premium interior design & build studio crafting the spaces where the world does its best work.
            </p>
            <form onSubmit={subscribe} className="mt-8 flex">
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Your email for insights" className="flex-1 bg-white/5 border border-white/10 border-r-0 rounded-l-full px-5 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold" />
              <button disabled={loading} className="bg-gold text-navy px-5 rounded-r-full font-semibold text-sm hover:bg-white transition-colors">
                {loading ? '…' : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>

          {[
            { title: 'Company', links: ['About', 'Team', 'Careers', 'Press'] },
            { title: 'Services', links: ['Interior Design', 'Design & Build', 'MEP', 'Furniture'] },
            { title: 'Resources', links: ['Projects', 'Insights', 'Case Studies', 'Brochures'] },
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
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} Aureon Design & Build. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms</a>
            <a href="#" className="hover:text-gold">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/971501234567" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
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

  const projTypes = ['Corporate Office', 'Hotel / Hospitality', 'Restaurant / F&B', 'Retail', 'Residential', 'Healthcare'];
  const budgets = ['< $100K', '$100K – $500K', '$500K – $1M', '$1M – $5M', '$5M+'];
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
                        <Input value={form.location} onChange={(e) => upd('location', e.target.value)} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" placeholder="City, Country" />
                      </div>
                      <div>
                        <label className="text-xs tracking-widest text-navy/60 uppercase">Area (sq ft)</label>
                        <Input value={form.area} onChange={(e) => upd('area', e.target.value)} className="mt-2 h-12 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0" placeholder="e.g. 12,000" />
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
                      <Textarea value={form.description} onChange={(e) => upd('description', e.target.value)} rows={4} className="mt-2 rounded-none border-0 border-b border-black/15 focus-visible:ring-0 focus-visible:border-gold px-0 resize-none" placeholder="Vision, must-haves, constraints…" />
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

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  Send,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Github,
  Dribbble,
  Globe,
} from 'lucide-react';

const serviceLinks = [
  { label: 'Website Design & Development', href: '#services' },
  { label: 'Web Applications', href: '#services' },
  { label: 'Mobile Applications', href: '#services' },
  { label: 'AI Automation', href: '#automation' },
  { label: 'UI/UX Design', href: '#services' },
  { label: 'Custom Solutions', href: '#services' },
];

const companyLinks = [
  { label: 'About MaHris', href: '#about' },
  { label: 'Our Process', href: '#process' },
  { label: 'Why MaHris', href: '#why-mahris' },
  { label: 'Case Studies', href: '#work' },
  { label: 'Careers', href: '#contact' },
  { label: 'Blog', href: '#contact' },
];

const resourceLinks = [
  { label: 'Our Approach', href: '#why-mahris' },
  { label: 'Technologies', href: '#services' },
  { label: 'FAQ', href: '#about' },
  { label: 'Privacy Policy', href: '#contact' },
  { label: 'Terms of Service', href: '#contact' },
  { label: 'Support', href: '#contact' },
];

export const Footer: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer
      className="relative w-full bg-[#050507] pt-12 pb-16 sm:pb-20 select-none border-t border-white/[0.04] overflow-hidden"
      aria-label="Site Footer"
    >
      {/* Ambient background lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/[0.03] rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-10 lg:gap-12">
        
        {/* 
          =============================================================
          1. TOP CTA STRIP
          =============================================================
        */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#09090E]/90 border border-white/[0.08] p-7 sm:p-9 lg:p-10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(139,92,246,0.12)]">
          {/* Subtle animated flowing wave grid pattern in background */}
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <svg
              viewBox="0 0 1200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full object-cover"
            >
              <motion.path
                d="M0,100 C300,160 600,40 900,120 C1050,160 1150,80 1200,100"
                stroke="#8B5CF6"
                strokeWidth="1.5"
                strokeDasharray="8 8"
                animate={!shouldReduceMotion ? { strokeDashoffset: [0, -100] } : {}}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
              <motion.path
                d="M0,120 C250,50 550,150 850,70 C1000,30 1120,110 1200,80"
                stroke="#A78BFA"
                strokeWidth="1"
                strokeOpacity="0.6"
                animate={!shouldReduceMotion ? { strokeDashoffset: [0, 100] } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
            {/* Left Content */}
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Purple Icon Box */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-[#A78BFA] shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.25)]">
                <ArrowUpRight className="w-6 h-6 text-[#A78BFA]" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-[-0.02em] text-white">
                  Ready to start{' '}
                  <span className="text-[#A78BFA] bg-gradient-to-r from-[#A78BFA] to-purple-300 bg-clip-text text-transparent">
                    your next project?
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Let’s build something exceptional together.
                </p>
              </div>
            </div>

            {/* Right Action Button */}
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.65)] transition-all duration-300 hover:-translate-y-0.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* 
          =============================================================
          2. MAIN MULTI-COLUMN FOOTER CONTAINER
          =============================================================
        */}
        <div className="relative w-full rounded-3xl bg-[#07070B]/95 border border-white/[0.08] p-8 sm:p-12 lg:p-14 lg:pr-16 xl:pr-20 shadow-[0_30px_90px_rgba(0,0,0,0.9)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            
            {/* ================= COLUMN 1: BRAND & NEWSLETTER (lg:col-span-3) ================= */}
            <div className="lg:col-span-3 flex flex-col items-start pr-0 lg:pr-4">
              {/* Brand Header */}
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src="/images/mahris-logo.png"
                  alt="MaHris Logo"
                  className="w-10 h-10 object-contain filter drop-shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                    MaHris
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#A78BFA] uppercase mt-1">
                    DIGITAL SOLUTIONS STUDIO
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] leading-relaxed text-zinc-400 max-w-sm mb-6">
                We design and develop digital solutions, AI automation and experiences that help businesses operate, grow and stand out in the digital world.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-2.5 mb-8">
                <a
                  href="https://www.linkedin.com/in/mah-noor-83338b39a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-400 hover:text-white hover:shadow-[0_0_12px_#8B5CF6] transition-all flex items-center justify-center hover:-translate-y-0.5"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Behance"
                  className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-400 hover:text-white hover:shadow-[0_0_12px_#8B5CF6] transition-all flex items-center justify-center hover:-translate-y-0.5"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dribbble"
                  className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-400 hover:text-white hover:shadow-[0_0_12px_#8B5CF6] transition-all flex items-center justify-center hover:-translate-y-0.5"
                >
                  <Dribbble className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Mahnoor-Akhtar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-400 hover:text-white hover:shadow-[0_0_12px_#8B5CF6] transition-all flex items-center justify-center hover:-translate-y-0.5"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>

              {/* Compact Newsletter Card */}
              <div className="w-full max-w-sm rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 p-5 transition-all shadow-inner">
                <div className="flex items-center gap-2 mb-1.5">
                  <Mail className="w-4 h-4 text-[#A78BFA]" />
                  <h4 className="text-xs font-bold tracking-[0.14em] text-white uppercase">
                    STAY UPDATED
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-400 mb-3.5">
                  Get insights, updates and ideas straight to your inbox.
                </p>

                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-[#09090F] border border-white/10 focus:border-purple-500/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="w-10 h-10 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.35)] transition-all hover:scale-105 shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                {subscribed && (
                  <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                    Thank you for subscribing!
                  </p>
                )}
              </div>
            </div>

            {/* ================= COLUMN 2: SERVICES (lg:col-span-2) ================= */}
            <div className="lg:col-span-2 flex flex-col items-start">
              <h4 className="text-xs font-bold tracking-[0.16em] text-white uppercase mb-2">
                SERVICES
              </h4>
              <div className="w-6 h-[2px] bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6] rounded-full mb-5" />

              <ul className="flex flex-col gap-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-all duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#A78BFA] group-hover:shadow-[0_0_6px_#8B5CF6] transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= COLUMN 3: COMPANY (lg:col-span-2) ================= */}
            <div className="lg:col-span-2 flex flex-col items-start">
              <h4 className="text-xs font-bold tracking-[0.16em] text-white uppercase mb-2">
                COMPANY
              </h4>
              <div className="w-6 h-[2px] bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6] rounded-full mb-5" />

              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-all duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#A78BFA] group-hover:shadow-[0_0_6px_#8B5CF6] transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= COLUMN 4: RESOURCES (lg:col-span-2) ================= */}
            <div className="lg:col-span-2 flex flex-col items-start">
              <h4 className="text-xs font-bold tracking-[0.16em] text-white uppercase mb-2">
                RESOURCES
              </h4>
              <div className="w-6 h-[2px] bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6] rounded-full mb-5" />

              <ul className="flex flex-col gap-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-xs sm:text-[13px] text-zinc-400 hover:text-white transition-all duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#A78BFA] group-hover:shadow-[0_0_6px_#8B5CF6] transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= COLUMN 5: GET IN TOUCH (lg:col-span-3) ================= */}
            <div className="lg:col-span-3 flex flex-col items-start pr-2 sm:pr-4 lg:pr-6">
              <h4 className="text-xs font-bold tracking-[0.16em] text-white uppercase mb-2">
                GET IN TOUCH
              </h4>
              <div className="w-6 h-[2px] bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6] rounded-full mb-5" />

              <div className="flex flex-col gap-4">
                {/* Location */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-[13px] font-medium text-white block">
                      Gujrat, Pakistan
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Serving clients worldwide
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <a
                      href="mailto:mahris.digital@gmail.com"
                      className="text-xs sm:text-[13px] font-medium text-white hover:text-[#A78BFA] transition-colors block"
                    >
                      mahris.digital@gmail.com
                    </a>
                    <span className="text-[11px] text-zinc-500">
                      We reply within 24 hours
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <a
                      href="tel:+923147238942"
                      className="text-xs sm:text-[13px] font-medium text-white hover:text-[#A78BFA] transition-colors block"
                    >
                      +92 314 7238942
                    </a>
                    <span className="text-[11px] text-zinc-500">
                      Mon – Fri, 10AM – 7PM PKT
                    </span>
                  </div>
                </div>

                {/* Project CTA Block */}
                <div className="flex items-start gap-2.5 pt-1">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] shrink-0 mt-0.5">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 block mb-1">
                      Let&apos;s start a conversation
                    </span>
                    <a
                      href="#contact"
                      className="group inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-[#A78BFA] hover:text-white transition-colors uppercase"
                    >
                      <span>START A PROJECT</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 
            =============================================================
            3. BOTTOM FOOTER BAR
            =============================================================
          */}
          <div className="mt-12 lg:mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
            {/* Copyright */}
            <span>© 2025 MaHris. All rights reserved.</span>

            {/* Center Logo Mark with Glowing Cardinal Lines */}
            <div className="flex items-center gap-3">
              <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <img
                src="/images/mahris-logo.png"
                alt="MaHris Symbol"
                className="w-6 h-6 object-contain filter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] opacity-80"
                loading="lazy"
              />
              <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
            </div>

            {/* Tagline */}
            <span>
              Crafted with{' '}
              <strong className="text-[#A78BFA] font-semibold">purpose</strong>. Built for{' '}
              <strong className="text-[#A78BFA] font-semibold">impact</strong>.
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

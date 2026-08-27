import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Clock,
  ShieldCheck,
  TrendingUp,
  LifeBuoy,
} from 'lucide-react';

interface BenefitItem {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    number: '01',
    icon: Clock,
    title: 'FAST RESPONSE',
    description: 'We respond within 24 hours to every inquiry.',
  },
  {
    number: '02',
    icon: ShieldCheck,
    title: 'TRANSPARENT PROCESS',
    description: 'Clear communication and complete transparency.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'RESULT DRIVEN',
    description: 'Solutions built to deliver measurable results and real impact.',
  },
  {
    number: '04',
    icon: LifeBuoy,
    title: 'ONGOING SUPPORT',
    description: 'We’re by your side even after launch and beyond.',
  },
];

const avatars = [
  { initials: 'AC', bg: 'bg-purple-900/80 text-purple-200' },
  { initials: 'SL', bg: 'bg-indigo-900/80 text-indigo-200' },
  { initials: 'MR', bg: 'bg-violet-900/80 text-violet-200' },
  { initials: 'DK', bg: 'bg-fuchsia-900/80 text-fuchsia-200' },
];

export const CTA: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#050507] py-28 sm:py-36 lg:py-44 select-none border-t border-white/[0.04] overflow-hidden"
      aria-label="Contact MaHris"
    >
      {/* 
        =============================================================
        CINEMATIC 3D BACKGROUND ARTWORK
        Using public/images/cta-background.png directly
        =============================================================
      */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-85 lg:opacity-100"
        style={{ backgroundImage: "url('/images/cta-background.png')" }}
        aria-hidden="true"
      />

      {/* 
        =============================================================
        BLAZING LIGHT-LINE ANIMATION OVERLAY
        Traveling energy beams moving along the existing neon lines/ring
        =============================================================
      */}
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-[2]"
        aria-hidden="true"
      >
        <defs>
          {/* Intense Blazing Violet Glow Filter */}
          <filter id="blazeGlowCore" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="blurWide" />
            <feGaussianBlur stdDeviation="4" result="blurMid" />
            <feGaussianBlur stdDeviation="1.5" result="blurSharp" />
            <feMerge>
              <feMergeNode in="blurWide" />
              <feMergeNode in="blurMid" />
              <feMergeNode in="blurSharp" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Linear Gradient for Ring Trail */}
          <linearGradient id="ringTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#C4B5FD" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>

          {/* Linear Gradient for Vertical Pillars */}
          <linearGradient id="vertTrailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.45" />
            <stop offset="85%" stopColor="#C4B5FD" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        {!shouldReduceMotion && (
          <>
            {/* ================= 1. CIRCULAR NEON RING BLAZING ENERGY (6.5s cycle) ================= */}
            {/* Trailing Energy Beam along the Ring */}
            <path
              d="M 960, 135 a 305,305 0 1,1 -0.1,0"
              stroke="url(#ringTrailGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="180 1740"
              className="animate-ring-beam"
              filter="url(#blazeGlowCore)"
            />
            {/* Bright Blazing Energy Point */}
            <circle r="4.5" fill="#FFFFFF" filter="url(#blazeGlowCore)">
              <animateMotion
                path="M 960, 135 a 305,305 0 1,1 -0.1,0"
                dur="6.5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* ================= 2. VERTICAL NEON PILLAR 1 (5.4s cycle) ================= */}
            <path
              d="M 1580, 140 L 1580, 840"
              stroke="url(#vertTrailGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="100 700"
              className="animate-vert-beam-1"
              filter="url(#blazeGlowCore)"
            />
            <circle r="3.5" fill="#FFFFFF" filter="url(#blazeGlowCore)">
              <animateMotion
                path="M 1580, 140 L 1580, 840"
                dur="5.4s"
                repeatCount="indefinite"
              />
            </circle>

            {/* ================= 3. VERTICAL NEON PILLAR 2 (7.2s cycle) ================= */}
            <path
              d="M 1810, 80 L 1810, 920"
              stroke="url(#vertTrailGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="110 840"
              className="animate-vert-beam-2"
              filter="url(#blazeGlowCore)"
            />
            <circle r="3.5" fill="#FFFFFF" filter="url(#blazeGlowCore)">
              <animateMotion
                path="M 1810, 80 L 1810, 920"
                dur="7.2s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </svg>

      {/* Atmospheric dark gradient overlays to ensure left text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/80 to-transparent pointer-events-none z-[3]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507] pointer-events-none z-[3]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* 
          -------------------------------------------------------------
          MAIN 2-COLUMN CINEMATIC FINALE
          LEFT ~45%: Text, CTA Buttons & Trust Line
          RIGHT ~55%: Open space revealing the 3D background artwork
          -------------------------------------------------------------
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center min-h-[580px] lg:min-h-[640px]">
          
          {/* ================= LEFT COLUMN: Messaging & Action (~45%) ================= */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left z-20">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 mb-4"
            >
              <span
                className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]"
                aria-hidden="true"
              />
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-[#A78BFA] uppercase">
                LET&apos;S BUILD SOMETHING EXCEPTIONAL
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.75rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-medium tracking-[-0.045em] text-white uppercase leading-[0.98] mb-6"
            >
              READY TO BRING
              <br />
              YOUR IDEA{' '}
              <span className="text-[#8B5CF6] drop-shadow-[0_0_35px_rgba(139,92,246,0.45)]">
                TO LIFE?
              </span>
            </motion.h2>

            {/* Thin Purple Decorative Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isSectionInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-[2px] bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6] rounded-full origin-left mb-6"
              aria-hidden="true"
            />

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-[17px] leading-relaxed text-zinc-300/90 max-w-lg mb-8 font-normal"
            >
              We partner with ambitious businesses to create digital solutions that drive real impact and lasting growth. Let&apos;s build something remarkable together.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8"
            >
              {/* Primary CTA Button */}
              <a
                href="mailto:contact@mahris.com"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-white bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.55)] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400"
              >
                <span>START A PROJECT</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA Button */}
              <a
                href="mailto:contact@mahris.com?subject=Consultation%20Request"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-zinc-200 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-purple-500/40 hover:border-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <Calendar className="w-4 h-4 text-purple-300 group-hover:text-white transition-colors" />
                <span>BOOK A CONSULTATION</span>
              </a>
            </motion.div>

            {/* Subtle Trust Line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 pt-2"
            >
              {/* Avatar Stack */}
              <div className="flex items-center">
                {avatars.map((avatar, idx) => (
                  <div
                    key={avatar.initials}
                    className={`w-7 h-7 rounded-full border-2 border-[#050507] -ml-2 first:ml-0 ${avatar.bg} text-[10px] font-bold flex items-center justify-center shadow-md`}
                    style={{ zIndex: 10 - idx }}
                  >
                    {avatar.initials}
                  </div>
                ))}
              </div>

              {/* Trust Copy with Glowing Pulse Dot */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="text-xs sm:text-[13px] font-medium text-zinc-400">
                  <strong className="text-zinc-200 font-semibold">50+ businesses</strong> already growing with MaHris
                </span>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: Open space allowing background 3D art to shine (~55%) ================= */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 h-full min-h-[400px]" />
        </div>

        {/* 
          -------------------------------------------------------------
          BOTTOM BENEFITS STRIP (4 Key Operational Commitments)
          -------------------------------------------------------------
        */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 lg:mt-24 pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 backdrop-blur-sm"
        >
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="flex items-start gap-4 lg:px-8 lg:border-r lg:border-white/[0.06] first:lg:pl-0 last:lg:border-r-0 last:lg:pr-0"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#A78BFA]">
                      {item.number}
                    </span>
                    <h4 className="text-xs sm:text-[13px] font-bold tracking-[0.12em] text-white uppercase">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-[13px] text-zinc-400 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>

      {/* Global Keyframes for Continuous Blazing Energy Beams */}
      <style>{`
        .animate-ring-beam {
          animation: ringBeamMove 6.5s linear infinite;
        }
        .animate-vert-beam-1 {
          animation: vertBeamMove1 5.4s linear infinite;
        }
        .animate-vert-beam-2 {
          animation: vertBeamMove2 7.2s linear infinite;
        }

        @keyframes ringBeamMove {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -1920;
          }
        }
        @keyframes vertBeamMove1 {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -800;
          }
        }
        @keyframes vertBeamMove2 {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -950;
          }
        }
      `}</style>
    </section>
  );
};

export default CTA;

import React, { useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import {
  ArrowUpRight,
  Crosshair,
  PenTool,
  Code2,
  Users2,
  Box,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react';

interface PrincipleCard {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const principles: PrincipleCard[] = [
  {
    number: '01',
    icon: Crosshair,
    title: 'BUILT AROUND YOUR BUSINESS',
    description:
      'We don’t believe in one-size-fits-all. Every solution is crafted around your goals, audience and real challenges.',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'DESIGN + DEVELOPMENT',
    description:
      'Design and development work together from day one, ensuring a seamless experience from concept to launch.',
  },
  {
    number: '03',
    icon: Code2,
    title: 'MODERN TECHNOLOGY',
    description:
      'We use modern technologies, AI and automation to build solutions that are scalable, secure and ready for what’s next.',
  },
  {
    number: '04',
    icon: Users2,
    title: 'HUMAN EXPERIENCE',
    description:
      'Behind every product are real people. We design experiences that are intuitive, accessible and actually enjoyable to use.',
  },
];

const stats = [
  {
    value: '50+',
    label: 'PROJECTS DELIVERED',
    description: 'Digital solutions that create measurable impact.',
    icon: Box,
  },
  {
    value: '30+',
    label: 'HAPPY CLIENTS',
    description: 'Long-term partnerships built on trust and results.',
    icon: Users,
  },
  {
    value: '3+',
    label: 'YEARS OF EXPERIENCE',
    description: 'Turning ideas into products that stand the test of time.',
    icon: Clock,
  },
  {
    value: '100%',
    label: 'FOCUS ON QUALITY',
    description: 'Committed to quality in every detail we deliver.',
    icon: Sparkles,
  },
];

export const WhyMaHris: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <section
      id="why-mahris"
      ref={sectionRef}
      className="relative w-full bg-[#050507] py-14 sm:py-18 lg:py-20 select-none border-t border-white/[0.04] overflow-hidden"
      aria-label="Why MaHris"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[900px] h-[650px] bg-purple-600/[0.035] rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* 
          -------------------------------------------------------------
          MAIN 2-COLUMN LAYOUT
          LEFT ~38%: Statement & CTA
          RIGHT ~62%: 2x2 Architectural Cards with Central MaHris Logo Anchor
          -------------------------------------------------------------
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ================= LEFT COLUMN: Editorial Statement (~38%) ================= */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-20">
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
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.14em] text-[#A78BFA] uppercase">
                WHY MAHRIS
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.75rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-medium tracking-[-0.045em] text-white leading-[0.98] mb-6"
            >
              We build
              <br />
              with
              <br />
              <span className="text-[#8B5CF6] drop-shadow-[0_0_30px_rgba(139,92,246,0.35)]">
                purpose.
              </span>
            </motion.h2>

            {/* Thin Horizontal Purple Accent Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isSectionInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-[2px] bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6] rounded-full origin-left mb-6"
              aria-hidden="true"
            />

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-[17px] leading-relaxed text-zinc-300/90 max-w-[520px] mb-8 font-normal"
            >
              MaHris combines strategy, design, development and intelligent automation to create digital solutions that are not only beautiful, but built to perform.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.14em] uppercase text-white bg-purple-500/5 hover:bg-purple-500/15 border border-purple-500/40 hover:border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400"
              >
                <span>LET’S BUILD TOGETHER</span>
                <ArrowUpRight className="w-4 h-4 text-purple-300 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: 2x2 Cards with Central MaHris Anchor (~62%) ================= */}
          <div className="lg:col-span-7 relative">
            {/* Ambient Backlight behind Center */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/[0.14] rounded-full blur-[140px] pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* 2x2 Architectural Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 relative">
              {principles.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2 + idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative p-7 sm:p-8 rounded-2xl bg-[#09090E]/90 hover:bg-[#0E0E16]/95 border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
                  >
                    {/* Bottom Edge Restrained Glow on Hover */}
                    <div
                      className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Top Row: Icon Container + Purple Mono Number */}
                    <div className="flex items-center justify-between w-full mb-6">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] group-hover:text-white group-hover:border-purple-400/60 group-hover:shadow-[0_0_15px_#8B5CF6] transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#A78BFA]">
                        {item.number}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-base sm:text-lg font-bold tracking-[0.05em] text-white uppercase mb-2.5 leading-snug">
                      {item.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-sm leading-relaxed text-zinc-400 font-normal">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}

              {/* 
                =============================================================
                CENTRAL MAHRIS LOGO ANCHOR (Desktop Centerpiece)
                =============================================================
              */}
              <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
                {/* Outer Rotating Dashed Orbital Ring */}
                <motion.div
                  animate={!shouldReduceMotion ? { rotate: 360 } : {}}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-48 h-48 rounded-full border border-purple-500/20 border-dashed pointer-events-none"
                  aria-hidden="true"
                />

                {/* Inner Counter-Rotating Orbital Ring */}
                <motion.div
                  animate={!shouldReduceMotion ? { rotate: -360 } : {}}
                  transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-60 h-60 rounded-full border border-purple-500/10 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Cardinal Horizontal & Vertical Connecting Lines */}
                <div className="absolute w-40 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent pointer-events-none" />
                <div className="absolute h-40 w-[1px] bg-gradient-to-b from-transparent via-purple-500/40 to-transparent pointer-events-none" />

                {/* Central Technical Hexagonal Badge Container */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isSectionInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-2xl bg-[#09090F] border border-purple-500/40 flex items-center justify-center p-3 shadow-[0_0_40px_rgba(139,92,246,0.4),0_0_80px_rgba(139,92,246,0.2)] pointer-events-auto group"
                >
                  {/* Subtle Inner Ring */}
                  <div
                    className="absolute inset-1 rounded-xl border border-purple-500/20 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* 4 Glowing Purple Cardinal Nodes */}
                  <span
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_8px_#8B5CF6]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_8px_#8B5CF6]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_8px_#8B5CF6]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_8px_#8B5CF6]"
                    aria-hidden="true"
                  />

                  {/* Official MaHris Logo Image */}
                  <img
                    src="/images/mahris-logo.png"
                    alt="MaHris Visual System Core"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(139,92,246,0.5)] select-none pointer-events-none group-hover:scale-105 transition-transform duration-300"
                    loading="eager"
                  />
                </motion.div>
              </div>
            </div>

            {/* Mobile Fallback Center Badge */}
            <div className="sm:hidden flex items-center justify-center my-6">
              <div className="relative w-20 h-20 rounded-2xl bg-[#09090F] border border-purple-500/40 flex items-center justify-center p-3 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <img
                  src="/images/mahris-logo.png"
                  alt="MaHris Visual System Core"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] select-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 
          -------------------------------------------------------------
          BOTTOM PROOF / STATISTICS BAR
          -------------------------------------------------------------
        */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 lg:mt-24 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 lg:p-10 backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0"
        >
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-start gap-4 lg:px-8 lg:border-r lg:border-white/[0.06] first:lg:pl-0 last:lg:border-r-0 last:lg:pr-0"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Numbers & Copy */}
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
                    {item.value}
                  </span>
                  <h4 className="text-xs font-bold tracking-[0.12em] text-zinc-300 uppercase mb-1">
                    {item.label}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-zinc-400 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyMaHris;

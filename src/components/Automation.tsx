import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { ArrowUpRight, Zap, Network, BrainCircuit, Clock, TrendingUp, DollarSign, ShieldCheck } from 'lucide-react';

interface BenefitItem {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    number: '01',
    icon: Zap,
    title: 'CUT REPETITIVE WORK',
    description: 'Automate manual tasks and save valuable time every day.',
  },
  {
    number: '02',
    icon: Network,
    title: 'CONNECT YOUR TOOLS',
    description: 'We integrate the platforms you already use into a seamless workflow.',
  },
  {
    number: '03',
    icon: BrainCircuit,
    title: 'SMARTER DECISIONS',
    description: 'AI processes data, finds patterns and helps your team make better decisions.',
  },
];

const metrics = [
  {
    value: '240+',
    label: 'HOURS SAVED',
    description: 'Average time saved per month through automation.',
    icon: Clock,
  },
  {
    value: '70%',
    label: 'FASTER PROCESSES',
    description: 'Workflows run in seconds instead of hours.',
    icon: TrendingUp,
  },
  {
    value: '35%',
    label: 'COST REDUCTION',
    description: 'Reduce operational costs with smart automation.',
    icon: DollarSign,
  },
  {
    value: '99.9%',
    label: 'RELIABILITY',
    description: 'Built with stability, monitoring and error handling.',
    icon: ShieldCheck,
  },
];

export const Automation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const isSectionInView = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' });

  // Detect desktop screen and hover capabilities
  useEffect(() => {
    const checkIsDesktop = () => {
      const isHoverable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const isWideEnough = window.innerWidth >= 1024;
      setIsDesktop(isHoverable && isWideEnough);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  // Subtle mouse depth response on active visual (Max movement: 3-6px)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop || shouldReduceMotion) return;

      const rect = visualRef.current?.getBoundingClientRect();
      if (!rect) return;

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normalizedX = (clientX / rect.width - 0.5) * 2;
      const normalizedY = (clientY / rect.height - 0.5) * 2;

      setMouseOffset({
        x: normalizedX * 5,
        y: normalizedY * 5,
      });
    },
    [isDesktop, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  return (
    <section
      id="automation"
      ref={sectionRef}
      className="relative w-full bg-[#050507] py-28 sm:py-36 lg:py-44 select-none border-t border-white/[0.04] overflow-hidden"
      aria-label="MaHris AI Automation"
    >
      {/* Background atmospheric lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[1000px] h-[750px] bg-purple-600/[0.045] rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* 
          -------------------------------------------------------------
          MAIN 40 / 60 COMPOSITION
          LEFT ~40%: Editorial Headline, Supporting Text, Benefits, CTA
          RIGHT ~60%: HUGE IMMERSIVE LIVE AUTOMATION WORKFLOW CANVAS
          -------------------------------------------------------------
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center min-h-[720px] lg:min-h-[820px] xl:min-h-[880px]">
          
          {/* ================= LEFT COLUMN: Content & Benefits (~40%) ================= */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-start text-left z-20 shrink-0">
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
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#A78BFA] uppercase">
                AI AUTOMATION
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.75rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-medium tracking-[-0.045em] text-white uppercase leading-[0.98] mb-6"
            >
              AUTOMATE
              <br />
              THE WORK
              <br />
              THAT
              <br />
              <span className="text-[#8B5CF6] drop-shadow-[0_0_35px_rgba(139,92,246,0.4)]">
                DRIVES
                <br />
                RESULTS.
              </span>
            </motion.h2>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-[16px] leading-relaxed text-zinc-300/90 max-w-lg mb-10 font-normal"
            >
              We build intelligent automation systems that connect your tools, reduce repetitive tasks and help your business operate at full speed.
            </motion.p>

            {/* Three Structured Benefits */}
            <div className="w-full flex flex-col gap-4 mb-10">
              {benefits.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.25 + idx * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-start gap-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300"
                  >
                    {/* Icon Container */}
                    <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] group-hover:text-white group-hover:shadow-[0_0_12px_#8B5CF6] transition-all shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[11px] font-bold text-[#A78BFA]">
                          {item.number}
                        </span>
                        <h3 className="text-xs sm:text-[13px] font-bold tracking-[0.12em] text-white uppercase">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-white bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.55)] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400"
              >
                <span>EXPLORE AUTOMATION SOLUTIONS</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: HUGE IMMERSIVE LIVE AUTOMATION WORKFLOW CANVAS (~60%) ================= */}
          <div
            ref={visualRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-7 xl:col-span-7 relative flex items-center justify-end py-4 z-10 lg:-mr-16 xl:-mr-28 2xl:-mr-40"
          >
            {/* Ambient Purple Depth Glow behind System - Centered on AI Processing core */}
            <div
              className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[900px] h-[650px] bg-purple-600/[0.20] rounded-full blur-[170px] pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Live Interactive Visualization Container - Scaled 122-128% for Dominant System Presence */}
            <motion.div
              animate={{
                x: isDesktop && !shouldReduceMotion ? mouseOffset.x : 0,
                y: isDesktop && !shouldReduceMotion ? mouseOffset.y : 0,
              }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 120,
                mass: 0.5,
              }}
              className="relative w-full lg:w-[122%] xl:w-[128%] max-w-none origin-left aspect-[1535/1024] rounded-2xl overflow-hidden bg-[#07070B] border border-white/[0.10] shadow-[0_40px_140px_rgba(0,0,0,0.95),0_0_90px_rgba(139,92,246,0.18)]"
            >
              {/* Base Artwork Layer (public/images/automation-system.png) */}
              <img
                src="/images/automation-system.png"
                alt="MaHris Intelligent Automation Workflow System"
                className="w-full h-full object-cover object-center select-none pointer-events-none"
                loading="eager"
              />

              {/* 
                =============================================================
                LIVE ANIMATED SVG CONNECTION & SIGNAL OVERLAY
                Coordinates calibrated precisely to 1535 x 1024 viewBox
                =============================================================
              */}
              <svg
                viewBox="0 0 1535 1024"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                aria-hidden="true"
              >
                <defs>
                  {/* Glowing Blur Filters */}
                  <filter id="purpleGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="coreParticleGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="7" result="blur1" />
                    <feGaussianBlur stdDeviation="2.5" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur1" />
                      <feMergeNode in="blur2" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ================= Base Glowing Connection Overlay Paths ================= */}
                {/* 01 Trigger -> 02 Data Collection */}
                <path
                  d="M 292 436 L 354 436"
                  stroke="#A78BFA"
                  strokeWidth="2.5"
                  strokeOpacity="0.75"
                  filter="url(#purpleGlowFilter)"
                />
                {/* 02 Data Collection -> 03 AI Processing */}
                <path
                  d="M 556 436 L 634 436"
                  stroke="#A78BFA"
                  strokeWidth="2.5"
                  strokeOpacity="0.85"
                  filter="url(#purpleGlowFilter)"
                />
                {/* 03 AI Processing -> 04 Automated Action */}
                <path
                  d="M 902 436 L 980 436"
                  stroke="#A78BFA"
                  strokeWidth="2.5"
                  strokeOpacity="0.85"
                  filter="url(#purpleGlowFilter)"
                />
                {/* 04 Automated Action -> 05 Result */}
                <path
                  d="M 1180 436 L 1242 436"
                  stroke="#A78BFA"
                  strokeWidth="2.5"
                  strokeOpacity="0.75"
                  filter="url(#purpleGlowFilter)"
                />

                {/* Vertical Stem from AI Processing down to Platform Bus */}
                <path
                  d="M 767 612 L 767 692"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  strokeOpacity="0.8"
                  filter="url(#purpleGlowFilter)"
                />

                {/* Horizontal Platform Bus */}
                <path
                  d="M 322 692 L 1210 692"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeOpacity="0.7"
                  filter="url(#purpleGlowFilter)"
                />

                {/* Platform Bus Drops */}
                <path d="M 322 692 L 322 755" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.7" filter="url(#purpleGlowFilter)" />
                <path d="M 502 692 L 502 755" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.7" filter="url(#purpleGlowFilter)" />
                <path d="M 678 692 L 678 755" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.7" filter="url(#purpleGlowFilter)" />
                <path d="M 857 692 L 857 755" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.7" filter="url(#purpleGlowFilter)" />
                <path d="M 1033 692 L 1033 755" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.7" filter="url(#purpleGlowFilter)" />
                <path d="M 1210 692 L 1210 755" stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.7" filter="url(#purpleGlowFilter)" />

                {/* ================= Continuous Live Moving Signal Particles ================= */}
                {!shouldReduceMotion && (
                  <>
                    {/* Signal 1: 01 Trigger -> 02 Data Collection (2.4s) */}
                    <circle r="4.5" fill="#E9D5FF" filter="url(#coreParticleGlow)">
                      <animateMotion
                        path="M 292 436 L 354 436"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="2.5" fill="#FFFFFF">
                      <animateMotion
                        path="M 292 436 L 354 436"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Signal 2: 02 Data Collection -> 03 AI Processing (2.7s) */}
                    <circle r="5" fill="#E9D5FF" filter="url(#coreParticleGlow)">
                      <animateMotion
                        path="M 556 436 L 634 436"
                        dur="2.7s"
                        begin="0.4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="3" fill="#FFFFFF">
                      <animateMotion
                        path="M 556 436 L 634 436"
                        dur="2.7s"
                        begin="0.4s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Signal 3: 03 AI Processing -> 04 Automated Action (2.3s) */}
                    <circle r="5" fill="#E9D5FF" filter="url(#coreParticleGlow)">
                      <animateMotion
                        path="M 902 436 L 980 436"
                        dur="2.3s"
                        begin="0.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="3" fill="#FFFFFF">
                      <animateMotion
                        path="M 902 436 L 980 436"
                        dur="2.3s"
                        begin="0.8s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Signal 4: 04 Automated Action -> 05 Result (2.8s) */}
                    <circle r="4.5" fill="#E9D5FF" filter="url(#coreParticleGlow)">
                      <animateMotion
                        path="M 1180 436 L 1242 436"
                        dur="2.8s"
                        begin="1.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="2.5" fill="#FFFFFF">
                      <animateMotion
                        path="M 1180 436 L 1242 436"
                        dur="2.8s"
                        begin="1.2s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Vertical Signal from AI down to Platforms (2.5s) */}
                    <circle r="4.5" fill="#E9D5FF" filter="url(#coreParticleGlow)">
                      <animateMotion
                        path="M 767 612 L 767 692"
                        dur="2.5s"
                        begin="0.5s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Branching Signals into Platforms */}
                    <circle r="3.5" fill="#C4B5FD" filter="url(#purpleGlowFilter)">
                      <animateMotion
                        path="M 767 692 L 502 692 L 502 755"
                        dur="3.1s"
                        begin="1.0s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="3.5" fill="#C4B5FD" filter="url(#purpleGlowFilter)">
                      <animateMotion
                        path="M 767 692 L 678 692 L 678 755"
                        dur="2.7s"
                        begin="0.7s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="3.5" fill="#C4B5FD" filter="url(#purpleGlowFilter)">
                      <animateMotion
                        path="M 767 692 L 857 692 L 857 755"
                        dur="2.8s"
                        begin="0.9s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="3.5" fill="#C4B5FD" filter="url(#purpleGlowFilter)">
                      <animateMotion
                        path="M 767 692 L 1033 692 L 1033 755"
                        dur="3.2s"
                        begin="1.1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle r="3.5" fill="#C4B5FD" filter="url(#purpleGlowFilter)">
                      <animateMotion
                        path="M 767 692 L 1210 692 L 1210 755"
                        dur="3.4s"
                        begin="1.3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}

                {/* ================= AI Processing Pulsing Concentric Halos & Orbital Ring ================= */}
                <circle
                  cx="767"
                  cy="436"
                  r="88"
                  stroke="#8B5CF6"
                  strokeWidth="1.5"
                  strokeOpacity="0.45"
                  className="animate-ping"
                  style={{ animationDuration: '4s', transformOrigin: '767px 436px' }}
                />
                <circle
                  cx="767"
                  cy="436"
                  r="120"
                  stroke="#8B5CF6"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  filter="url(#purpleGlowFilter)"
                />
              </svg>

              {/* Inner subtle frame edge highlight */}
              <div
                className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </div>

        {/* 
          -------------------------------------------------------------
          BOTTOM METRICS ROW (4 Impact Statistics from Reference)
          -------------------------------------------------------------
        */}
        <div className="mt-20 lg:mt-24 pt-10 border-t border-white/[0.06] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-start text-left p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]"
              >
                {/* Metric Value + Icon */}
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                    {item.value}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Label */}
                <h4 className="text-xs font-bold tracking-[0.14em] text-zinc-300 uppercase mb-1">
                  {item.label}
                </h4>

                {/* Description */}
                <p className="text-[12px] text-zinc-400/90 leading-snug">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Automation;

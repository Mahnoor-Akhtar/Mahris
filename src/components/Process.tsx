import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import {
  ArrowUpRight,
  Search,
  Target,
  PenTool,
  Code2,
  CheckCircle2,
  Rocket,
  Zap,
} from 'lucide-react';

interface ProcessStep {
  id: string;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  image: string;
}

const steps: ProcessStep[] = [
  {
    id: 'discover',
    number: '01',
    title: 'DISCOVER',
    icon: Search,
    description:
      'We learn about your business, audience, goals and challenges to understand the real problem we’re solving.',
    image: '/images/process-discover.png',
  },
  {
    id: 'strategize',
    number: '02',
    title: 'STRATEGIZE',
    icon: Target,
    description:
      'We define the right strategy, product direction and roadmap to ensure we build the right solution.',
    image: '/images/process-strategize.png',
  },
  {
    id: 'design',
    number: '03',
    title: 'DESIGN',
    icon: PenTool,
    description:
      'We craft intuitive user experiences and clean, modern designs that communicate value and build trust.',
    image: '/images/process-design.png',
  },
  {
    id: 'build',
    number: '04',
    title: 'BUILD',
    icon: Code2,
    description:
      'We develop scalable, secure and high-performance solutions using modern technologies and best practices.',
    image: '/images/process-build.png',
  },
  {
    id: 'test',
    number: '05',
    title: 'TEST & REFINE',
    icon: CheckCircle2,
    description:
      'We test thoroughly, fix edge cases and refine every detail to make sure everything works flawlessly.',
    image: '/images/process-test.png',
  },
  {
    id: 'launch',
    number: '06',
    title: 'LAUNCH & GROW',
    icon: Rocket,
    description:
      'We launch your product and continue to support, optimize and help it grow over time.',
    image: '/images/process-launch.png',
  },
];

export const Process: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' });

  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Preload all 6 process image assets for instantaneous rendering
  useEffect(() => {
    steps.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  // Automatic gentle process rotation every 4.5 seconds
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full bg-[#050507] py-28 sm:py-36 lg:py-44 select-none border-t border-white/[0.04] overflow-hidden"
      aria-label="MaHris Process"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-600/[0.035] rounded-full blur-[190px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* 
          -------------------------------------------------------------
          1. HEADER AREA
          Left: Eyebrow + Headline + Purple Accent Line
          Right: Supporting Text + Outlined CTA
          -------------------------------------------------------------
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-20">
          {/* Left Column: Eyebrow + Large Headline */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
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
                OUR PROCESS
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.75rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-medium tracking-[-0.045em] text-white uppercase leading-[0.98] mb-5"
            >
              A CLEAR PROCESS.
              <br />
              <span className="text-[#8B5CF6] drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                EXCEPTIONAL
              </span>{' '}
              RESULTS.
            </motion.h2>

            {/* Short Purple Accent Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isSectionInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-14 h-[2px] bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6] rounded-full origin-left"
              aria-hidden="true"
            />
          </div>

          {/* Right Column: Paragraph + CTA */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between text-left lg:text-right pb-1">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-[16px] leading-relaxed text-zinc-300/90 max-w-md mb-6 font-normal"
            >
              We follow a proven process that keeps projects focused, transparent and efficient — from the first idea to long-term success.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-semibold tracking-[0.14em] uppercase text-white bg-purple-500/5 hover:bg-purple-500/15 border border-purple-500/40 hover:border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-purple-300 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* 
          -------------------------------------------------------------
          2. DESKTOP 6-STEP PROCESS TIMELINE & VISUAL SHOWCASE
          -------------------------------------------------------------
        */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="hidden lg:flex flex-col relative w-full mb-16"
        >
          {/* Animated Horizontal Timeline Bar */}
          <div className="relative w-full mb-10">
            {/* Background Base Line */}
            <div className="w-full h-[2px] bg-white/[0.08] relative">
              {/* Glowing Purple Pulse Line */}
              <div
                className="absolute inset-y-0 left-0 h-full bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent w-48 shadow-[0_0_12px_#8B5CF6] animate-timeline-pulse"
                style={{
                  animation: !shouldReduceMotion ? 'timelinePulse 6s linear infinite' : 'none',
                }}
              />
            </div>

            {/* Step Nodes along the Timeline */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between pointer-events-none px-4">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <div key={`node-${step.id}`} className="relative flex flex-col items-center">
                    {/* Step Number on top of node */}
                    <span
                      className={`font-mono text-xs font-bold tracking-wider mb-2.5 transition-all duration-300 ${
                        isActive ? 'text-[#A78BFA] scale-110' : 'text-zinc-500'
                      }`}
                    >
                      {step.number}
                    </span>

                    {/* Node Dot */}
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? 'border-[#A78BFA] bg-[#050507] shadow-[0_0_15px_#8B5CF6]'
                          : 'border-zinc-700 bg-[#050507]'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-[#A78BFA]' : 'bg-transparent'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6 Step Columns */}
          <div className="grid grid-cols-6 gap-5 xl:gap-6 pt-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`group relative flex flex-col cursor-pointer transition-all duration-400 ${
                    isActive ? 'opacity-100' : 'opacity-65 hover:opacity-95'
                  }`}
                >
                  {/* Step Header: Icon Container */}
                  <div className="flex items-center justify-start mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-purple-500/15 border border-purple-500/40 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] scale-105'
                          : 'bg-white/[0.03] border border-white/[0.08] text-zinc-400 group-hover:text-zinc-200 group-hover:border-purple-500/20'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3
                    className={`text-[15px] font-bold tracking-[0.06em] uppercase mb-1.5 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* Tiny Purple Accent Line */}
                  <div
                    className={`w-6 h-[1.5px] rounded-full mb-3 transition-all duration-300 ${
                      isActive ? 'bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6] w-8' : 'bg-white/10'
                    }`}
                  />

                  {/* Step Description */}
                  <p className="text-[12.5px] leading-relaxed text-zinc-400/90 mb-5 font-normal min-h-[58px]">
                    {step.description}
                  </p>

                  {/* 
                    Floating Product / UI Showcase Image Card
                    Preserves the supplied artwork with dark glass styling, glowing borders and subtle depth
                  */}
                  <div
                    className={`relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#09090F] transition-all duration-400 border ${
                      isActive
                        ? 'border-purple-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(139,92,246,0.22)] scale-[1.02] -translate-y-1'
                        : 'border-white/[0.08] shadow-[0_12px_35px_rgba(0,0,0,0.7)] group-hover:border-white/20'
                    }`}
                  >
                    <img
                      src={step.image}
                      alt={`${step.title} process visualization`}
                      className="w-full h-full object-cover object-center select-none pointer-events-none"
                      loading="lazy"
                    />

                    {/* Edge Highlight Ring */}
                    <div
                      className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 
          -------------------------------------------------------------
          3. MOBILE & TABLET PROCESS STACK (< lg)
          -------------------------------------------------------------
        */}
        <div className="lg:hidden flex flex-col gap-10 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <div
                key={`mob-${step.id}`}
                onClick={() => setActiveStep(idx)}
                className={`relative flex flex-col p-6 rounded-2xl bg-[#09090F] border transition-all duration-300 ${
                  isActive
                    ? 'border-purple-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(139,92,246,0.2)]'
                    : 'border-white/[0.08]'
                }`}
              >
                {/* Header: Number, Icon & Title */}
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-[#A78BFA] block">
                        STEP {step.number}
                      </span>
                      <h3 className="text-lg font-bold tracking-[0.04em] text-white uppercase">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                  {step.description}
                </p>

                {/* Mobile Large Process Visual */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#050507] border border-white/[0.08]">
                  <img
                    src={step.image}
                    alt={`${step.title} process visualization`}
                    className="w-full h-full object-cover object-center select-none"
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 
          -------------------------------------------------------------
          4. BOTTOM STATEMENT
          -------------------------------------------------------------
        */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 pt-6 border-t border-white/[0.06] text-center"
        >
          <div className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] shrink-0">
            <Zap className="w-3.5 h-3.5 fill-[#A78BFA]" />
          </div>
          <p className="text-xs sm:text-sm font-medium tracking-wide text-zinc-300">
            A process built on clarity, communication and commitment.{' '}
            <span className="text-[#A78BFA] font-semibold">That’s the MaHris way.</span>
          </p>
        </motion.div>

      </div>

      {/* Global CSS for Continuous Horizontal Timeline Pulse */}
      <style>{`
        @keyframes timelinePulse {
          0% {
            left: -10%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default Process;

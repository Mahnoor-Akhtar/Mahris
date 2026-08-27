import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';

interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  description: string;
  services: string[];
  visual: string;
}

const projects: ProjectItem[] = [
  {
    id: 'luxora',
    number: '01',
    name: 'Luxora',
    category: 'WEB DESIGN & DEVELOPMENT',
    description:
      'A luxury furniture e-commerce experience built for clarity, elegance and conversion.',
    services: ['UI/UX Design', 'Development', 'E-Commerce', 'CMS'],
    visual: '/images/work-luxora.png',
  },
  {
    id: 'finovo',
    number: '02',
    name: 'Finovo',
    category: 'WEB APPLICATION',
    description:
      'A financial management platform that helps businesses track, analyze and grow with confidence.',
    services: ['Product Design', 'Development', 'Dashboard', 'Analytics'],
    visual: '/images/work-finovo.png',
  },
  {
    id: 'moveo',
    number: '03',
    name: 'Moveo',
    category: 'MOBILE APPLICATION',
    description:
      'A fitness application designed to make workouts simple, personal and consistently motivating.',
    services: ['UI/UX Design', 'Mobile Development', 'Prototyping', 'App Store Optimization'],
    visual: '/images/work-moveo.png',
  },
  {
    id: 'nexora',
    number: '04',
    name: 'Nexora',
    category: 'CUSTOM DIGITAL PLATFORM',
    description:
      'A connected business platform combining analytics, workflow automation and intelligent operations.',
    services: ['Strategy', 'Product Design', 'AI Automation', 'Custom Development'],
    visual: '/images/work-project-04.png',
  },
];

export const Work: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const isSectionInView = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' });

  // Preload all project visuals on mount for instant zero-flicker transitions
  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.visual;
    });
  }, []);

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

  // Subtle multi-layer mouse depth response (Max movement: 5-8px)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop || shouldReduceMotion) return;

      const rect = showcaseRef.current?.getBoundingClientRect();
      if (!rect) return;

      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normalizedX = (clientX / rect.width - 0.5) * 2;
      const normalizedY = (clientY / rect.height - 0.5) * 2;

      setMouseOffset({
        x: normalizedX * 6,
        y: normalizedY * 6,
      });
    },
    [isDesktop, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[activeIndex];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full bg-[#050507] py-28 sm:py-36 lg:py-40 select-none border-t border-white/[0.04] overflow-hidden"
      aria-label="MaHris Featured Work"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[650px] bg-purple-600/[0.035] rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* 
          -------------------------------------------------------------
          EDITORIAL HEADER SECTION (Headline, Intro & Controls)
          -------------------------------------------------------------
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 lg:mb-16">
          {/* Left: Eyebrow + Huge Editorial Headline */}
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
                FEATURED WORK
              </span>
            </motion.div>

            {/* Powerful Editorial Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-medium tracking-[-0.045em] text-white uppercase leading-[0.98]"
            >
              DIGITAL PRODUCTS
              <br />
              WE’RE PROUD OF.
            </motion.h2>
          </div>

          {/* Right: Description + Controls + View All */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between h-full pt-2 lg:pt-6 text-left lg:text-right">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-[15px] lg:text-[16px] leading-relaxed text-zinc-300/90 max-w-md mb-6 font-normal"
            >
              A selection of projects where strategy, design and technology came together to create real impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-6"
            >
              {/* Project Counter */}
              <div className="inline-flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]"
                  aria-hidden="true"
                />
                <span className="font-mono text-sm font-bold tracking-widest text-[#A78BFA]">
                  {currentProject.number}
                </span>
                <span className="font-mono text-sm font-medium tracking-widest text-zinc-500">
                  / 04
                </span>
              </div>

              {/* Circular Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-purple-400/60 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-purple-400/60 flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  aria-label="Next project"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* View All Projects Button */}
              <a
                href="#contact"
                className="group hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.14em] uppercase text-zinc-200 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/15 hover:border-purple-400/60 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ml-1"
              >
                <span>VIEW ALL</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* 
          -------------------------------------------------------------
          LAYERED EDITORIAL COMPOSITION (HUGE VISUAL + ATTACHED METADATA)
          -------------------------------------------------------------
        */}
        <div
          ref={showcaseRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-end relative"
        >
          {/* HUGE PROJECT VISUAL (Occupies 8 cols ~68% width on desktop) */}
          <div className="lg:col-span-8 relative">
            {/* Layer 1: Ambient Purple Glow (Moves 2px) */}
            <motion.div
              animate={{
                x: isDesktop && !shouldReduceMotion ? mouseOffset.x * 0.35 : 0,
                y: isDesktop && !shouldReduceMotion ? mouseOffset.y * 0.35 : 0,
              }}
              className="absolute -inset-10 bg-purple-600/[0.14] rounded-full blur-[140px] pointer-events-none -z-10"
              aria-hidden="true"
            />

            {/* Subtle stacked background trace for depth */}
            <div className="hidden xl:block absolute -right-10 -top-6 w-full h-full opacity-[0.05] scale-[0.97] blur-[1px] pointer-events-none -z-10 rounded-2xl overflow-hidden">
              <img
                src={projects[(activeIndex + 1) % projects.length].visual}
                alt="Next project preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Layer 2: Main Active Project Visual (Moves 5-6px) */}
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
              className="relative w-full aspect-[16/10.5] rounded-2xl overflow-hidden bg-[#07070B] shadow-[0_35px_110px_rgba(0,0,0,0.95),0_0_80px_rgba(139,92,246,0.15)] border border-white/[0.08]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={currentProject.id}
                  src={currentProject.visual}
                  alt={`${currentProject.name} digital product`}
                  initial={{
                    opacity: 0,
                    scale: 1.03,
                    x: direction * 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                    x: -direction * 20,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0.25 : 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full h-full object-cover object-center select-none pointer-events-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
                  loading="eager"
                />
              </AnimatePresence>

              {/* Thin subtle frame edge highlight */}
              <div
                className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* ATTACHED METADATA PANEL (Occupies 4 cols on desktop) */}
          <motion.div
            animate={{
              x: isDesktop && !shouldReduceMotion ? mouseOffset.x * 0.25 : 0,
              y: isDesktop && !shouldReduceMotion ? mouseOffset.y * 0.25 : 0,
            }}
            className="lg:col-span-4 flex flex-col justify-end lg:pl-2 xl:pl-4 pb-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`meta-${currentProject.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-start text-left"
              >
                {/* Number + Category */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#A78BFA]">
                    {currentProject.number}
                  </span>
                  <span className="text-zinc-600 text-xs">|</span>
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                    {currentProject.category}
                  </span>
                </div>

                {/* Project Name */}
                <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.02em] text-white uppercase mb-3">
                  {currentProject.name}
                </h3>

                {/* Description */}
                <p className="text-sm xl:text-[15px] leading-relaxed text-zinc-300 mb-6 font-normal">
                  {currentProject.description}
                </p>

                {/* Services Label & Badges */}
                <div className="w-full mb-6 pb-6 border-b border-white/[0.08]">
                  <span className="block text-[11px] font-semibold tracking-[0.22em] text-zinc-500 uppercase mb-3">
                    SERVICES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide text-zinc-300 bg-white/[0.03] border border-white/[0.08] hover:border-purple-400/40 transition-colors"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Project Action Link */}
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase text-white hover:text-[#A78BFA] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-400"
                >
                  <span>VIEW PROJECT</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#A78BFA] group-hover:translate-x-1 transition-all" />
                </a>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 
          -------------------------------------------------------------
          MOBILE & TABLET LAYOUT (< lg)
          Natural Vertical Flow:
          Header -> Large Visual -> Project Details -> Navigation
          -------------------------------------------------------------
        */}
        <div className="lg:hidden flex flex-col">
          {/* Header Intro */}
          <div className="max-w-xl mb-8">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span
                className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold tracking-[0.22em] text-[#A78BFA] uppercase">
                FEATURED WORK
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.045em] text-white uppercase leading-[0.98] mb-4">
              DIGITAL PRODUCTS
              <br />
              WE’RE PROUD OF.
            </h2>

            <p className="text-sm leading-relaxed text-zinc-300 mb-6">
              A selection of projects where strategy, design and technology came together to create real impact.
            </p>
          </div>

          {/* Large Project Visual */}
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#07070B] border border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(139,92,246,0.12)] mb-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={`mobile-${currentProject.id}`}
                src={currentProject.visual}
                alt={`${currentProject.name} digital product`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover object-center select-none pointer-events-none"
                loading="lazy"
              />
            </AnimatePresence>
            <div
              className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Project Details & Services */}
          <div className="flex flex-col items-start text-left w-full mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold tracking-widest text-[#A78BFA]">
                {currentProject.number}
              </span>
              <span className="text-zinc-600 text-xs">|</span>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                {currentProject.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold tracking-[-0.02em] text-white uppercase mb-2">
              {currentProject.name}
            </h3>

            <p className="text-sm leading-relaxed text-zinc-300 mb-5">
              {currentProject.description}
            </p>

            <div className="w-full mb-6">
              <span className="block text-[11px] font-semibold tracking-[0.2em] text-zinc-500 uppercase mb-2.5">
                SERVICES
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProject.services.map((service) => (
                  <span
                    key={`mob-${service}`}
                    className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide text-zinc-300 bg-white/[0.03] border border-white/[0.08]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation Controls & View Project */}
            <div className="flex items-center justify-between w-full pt-4 border-t border-white/[0.06]">
              {/* Counter + Controls */}
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center gap-2">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#A78BFA]">
                    {currentProject.number}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">/ 04</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/15 flex items-center justify-center text-zinc-300"
                    aria-label="Previous project"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/15 flex items-center justify-center text-zinc-300"
                    aria-label="Next project"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* View Project */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] uppercase text-white hover:text-[#A78BFA]"
              >
                <span>VIEW PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;

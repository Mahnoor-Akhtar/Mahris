import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

const services: ServiceItem[] = [
  {
    id: 'websites',
    number: '01',
    title: 'WEBSITES',
    description:
      'High-performance websites designed to represent your brand and turn visitors into customers.',
    image: '/images/service-websites.png',
  },
  {
    id: 'applications',
    number: '02',
    title: 'APPLICATIONS',
    description:
      'Web and mobile applications built around real users, real problems and real growth.',
    image: '/images/service-applications.png',
  },
  {
    id: 'ai-automation',
    number: '03',
    title: 'AI AUTOMATION',
    description:
      'Intelligent workflows that automate repetitive tasks and connect your tools.',
    image: '/images/service-ai-automation.png',
  },
  {
    id: 'uiux-design',
    number: '04',
    title: 'UI/UX DESIGN',
    description:
      'User experiences and interfaces that are clear, intuitive and visually memorable.',
    image: '/images/service-uiux.png',
  },
  {
    id: 'custom-solutions',
    number: '05',
    title: 'CUSTOM SOLUTIONS',
    description:
      'Tailored digital systems and platforms built around your unique business needs.',
    image: '/images/service-custom-solutions.png',
  },
];

export const Services: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const isSectionInView = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' });

  // Preload all 5 service images on mount for instant, flicker-free switching
  useEffect(() => {
    services.forEach((s) => {
      const img = new Image();
      img.src = s.image;
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

  // Sync active service with natural scroll position on desktop without hijacking scroll
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.45;
      let closestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - triggerY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((prev) => (prev !== closestIndex ? closestIndex : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDesktop]);

  // Subtle mouse depth response on active visual (Max movement: 3-5px)
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
        x: normalizedX * 4,
        y: normalizedY * 4,
      });
    },
    [isDesktop, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setMouseOffset({ x: 0, y: 0 });
  }, []);

  // Handle service click on desktop: activate & scroll smoothly to center
  const handleServiceSelect = (index: number) => {
    setActiveIndex(index);
    if (isDesktop && itemRefs.current[index]) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const activeService = services[activeIndex];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-[#050507] py-28 sm:py-36 lg:py-40 select-none border-t border-white/[0.04] overflow-hidden"
      aria-label="MaHris Services"
    >
      {/* Background ambient depth glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 right-1/4 w-[750px] h-[550px] bg-purple-600/[0.04] rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* 
          -------------------------------------------------------------
          SECTION HEADER
          -------------------------------------------------------------
        */}
        <div className="max-w-2xl mb-16 sm:mb-20 lg:mb-24">
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
              SERVICES
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] text-white uppercase leading-[1.08] mb-5"
          >
            WHAT WE BUILD
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-[16px] leading-relaxed text-zinc-300/90 max-w-xl font-normal"
          >
            End-to-end digital solutions that help businesses grow, operate smarter and scale faster.
          </motion.p>
        </div>

        {/* 
          -------------------------------------------------------------
          DESKTOP LAYOUT
          LEFT: Refined editorial service list (35-38%)
          RIGHT: HUGE, DOMINANT DIGITAL PRODUCT VISUAL (62-65%)
          -------------------------------------------------------------
        */}
        <div className="hidden lg:flex items-center justify-between gap-8 xl:gap-12 relative min-h-[75vh]">
          {/* Left Column: Interactive Service List */}
          <div className="w-[36%] xl:w-[35%] flex flex-col gap-5 py-4 z-20 shrink-0">
            {services.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  onClick={() => handleServiceSelect(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`group relative flex flex-col py-3.5 pl-5 pr-2 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'opacity-100'
                      : 'opacity-65 hover:opacity-95'
                  }`}
                >
                  {/* Thin vertical purple line indicator */}
                  <div
                    className={`absolute left-0 top-2 bottom-2 w-[2.5px] rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6] opacity-100 scale-y-100'
                        : 'bg-transparent opacity-0 scale-y-50'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Top Row: Number, Title & Arrow */}
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`font-mono text-xs sm:text-[13px] font-bold tracking-wider transition-colors duration-300 ${
                          isActive
                            ? 'text-[#A78BFA]'
                            : 'text-zinc-500 group-hover:text-[#A78BFA]'
                        }`}
                      >
                        {item.number}
                      </span>
                      <h3
                        className={`text-[22px] xl:text-[26px] font-semibold tracking-[-0.02em] uppercase transition-colors duration-300 ${
                          isActive
                            ? 'text-white font-bold'
                            : 'text-zinc-400 group-hover:text-zinc-200'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Arrow Indicator */}
                    <div
                      className={`transition-all duration-300 ${
                        isActive
                          ? 'text-[#A78BFA] translate-x-1 opacity-100'
                          : 'text-zinc-600 group-hover:text-zinc-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5'
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-[14px] xl:text-[15px] leading-[1.6] transition-colors duration-300 pl-7 ${
                      isActive
                        ? 'text-zinc-300 font-normal'
                        : 'text-zinc-500 group-hover:text-zinc-400'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 
            Right Column: HUGE DOMINANT PRODUCT VISUAL STAGE
            - Sticky while scrolling
            - Oversized relative to container (118-125% width)
            - Bleeds naturally towards the right edge of viewport
            - Smooth cubic-bezier transitions
          */}
          <div className="w-[64%] xl:w-[65%] sticky top-16 h-[calc(100vh-4rem)] min-h-[700px] flex flex-col justify-center z-10 -mr-16 xl:-mr-28 2xl:-mr-40 pointer-events-none">
            <div
              ref={showcaseRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-full flex flex-col justify-center items-end pointer-events-auto"
            >
              {/* Technical Metadata Row */}
              <div className="flex items-center justify-between w-full max-w-[90%] mb-4 px-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#A78BFA] bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                    {activeService.number} / 05
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                    ACTIVE SERVICE
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-white uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
                  <span>{activeService.title}</span>
                </div>
              </div>

              {/* Atmospheric Purple Radial Light BEHIND visual */}
              <div
                className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[750px] h-[550px] rounded-full pointer-events-none -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(124, 58, 237, 0.18), transparent 65%)',
                }}
                aria-hidden="true"
              />

              {/* 
                HUGE PRODUCT VISUAL STAGE
                - Scaled 118%-125% to naturally extend towards the right edge
                - Subtle floating elevation (0 -> -5px -> 0, 7s)
                - Micro cursor parallax response (3-5px)
                - Cinematic image transitions
              */}
              <motion.div
                animate={{
                  y: isDesktop && !shouldReduceMotion ? [0, -6, 0] : 0,
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-full flex items-center justify-end"
              >
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
                  className="relative w-[118%] xl:w-[125%] max-w-none origin-left flex items-center justify-center"
                >
                  {/* Animated Image Container */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_70px_rgba(139,92,246,0.15)]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeService.image}
                        src={activeService.image}
                        alt={`${activeService.title} product showcase`}
                        initial={{ opacity: 0, scale: 1.02, x: 15 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.97, x: -15 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="w-full h-full object-cover object-left-top xl:object-center select-none pointer-events-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                        loading="eager"
                      />
                    </AnimatePresence>

                    {/* Subtle frame edge ring */}
                    <div
                      className="absolute inset-0 ring-1 ring-inset ring-white/[0.08] rounded-2xl pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 
          -------------------------------------------------------------
          MOBILE & TABLET LAYOUT (< lg)
          Natural Sequential Stacking:
          Service Title -> Description -> Large Product Visual -> Next Service
          -------------------------------------------------------------
        */}
        <div className="lg:hidden flex flex-col gap-16 sm:gap-20">
          {services.map((item) => (
            <div
              key={`mobile-${item.id}`}
              className="flex flex-col items-start text-left w-full border-t border-white/[0.06] pt-10 first:border-t-0 first:pt-0"
            >
              {/* Header: Number & Title */}
              <div className="flex items-center gap-3 mb-2.5">
                <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#A78BFA] bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                  {item.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-white uppercase">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base leading-relaxed text-zinc-300 mb-6 max-w-xl">
                {item.description}
              </p>

              {/* Mobile Large Product Visual */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#07070B] border border-white/[0.08] shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(139,92,246,0.12)]">
                <img
                  src={item.image}
                  alt={`${item.title} product showcase`}
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

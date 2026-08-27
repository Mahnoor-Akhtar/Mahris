import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion, useInView, type Variants } from 'framer-motion';

interface PrincipleItem {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

/* Minimal SVG line icons matching the reference composition */
const StrategyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
  </svg>
);

const DesignIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const TechIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const AutomationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const principles: PrincipleItem[] = [
  {
    number: '01',
    icon: StrategyIcon,
    title: 'STRATEGY FIRST',
    description: 'We start with the real problem, not templates.',
  },
  {
    number: '02',
    icon: DesignIcon,
    title: 'DESIGN THAT CONNECTS',
    description: 'We design experiences people enjoy using.',
  },
  {
    number: '03',
    icon: TechIcon,
    title: 'TECHNOLOGY THAT SCALES',
    description: 'We build with modern technology for long-term growth.',
  },
  {
    number: '04',
    icon: AutomationIcon,
    title: 'AUTOMATION THAT WORKS',
    description: 'We automate what slows you down.',
  },
];

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingWrapperRef = useRef<HTMLDivElement>(null);

  // Reliable scroll observer attached to visible non-clipped containers
  const isSectionInView = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' });
  const isHeadingInView = useInView(headingWrapperRef, { once: true, margin: '0px 0px -40px 0px' });
  
  const [hasAnimated, setHasAnimated] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Trigger animation state reliably
  useEffect(() => {
    if (isSectionInView || isHeadingInView) {
      setHasAnimated(true);
    }
  }, [isSectionInView, isHeadingInView]);

  // Fallback timer: guarantees heading is never stuck in hidden state
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Desktop hover detection for subtle mouse parallax
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

  // Subtle 3D / parallax response to background (Maximum movement: 5-8px)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isDesktop || shouldReduceMotion) return;

      const rect = sectionRef.current?.getBoundingClientRect();
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
    setHoveredIndex(null);
  }, []);

  const isVisible = hasAnimated || isSectionInView || isHeadingInView;

  // Motion animation variants with smooth cinematic easing
  const lineVariants: Variants = {
    hidden: {
      y: shouldReduceMotion ? 0 : '105%',
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: (custom: number = 1) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.8,
        delay: shouldReduceMotion ? 0 : 0.15 + custom * 0.12,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const fadeUpVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.75,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const principlesContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.04 : 0.12,
        delayChildren: shouldReduceMotion ? 0.05 : 0.8,
      },
    },
  };

  const principleItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.65,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#050507] py-20 sm:py-24 lg:py-28 select-none border-t border-white/[0.04]"
      aria-label="About MaHris"
    >
      {/* 
        -------------------------------------------------------------
        BACKGROUND ARTWORK (Desktop & Large Screens)
        z-index: 0
        Uses exact background: public/images/about-background.png
        Preserves the 3D MaHris logo in the recessed purple niche on the right
        -------------------------------------------------------------
      */}
      <div className="hidden lg:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
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
          className="relative w-full h-full scale-[1.03] origin-center"
        >
          <img
            src="/images/about-background.png"
            alt="MaHris Architectural Brand Visual"
            className="w-full h-full object-cover object-[80%_center] xl:object-[78%_center] 2xl:object-center select-none pointer-events-none"
            loading="lazy"
          />
        </motion.div>

        {/* Left-side dark gradient overlay to guarantee crisp text contrast while blending into image */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/85 to-transparent w-[58%] pointer-events-none"
          aria-hidden="true"
        />
        {/* Soft top and bottom seamless fades */}
        <div
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050507] to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 
        -------------------------------------------------------------
        MAIN CONTENT CONTAINER
        z-index: 10
        Desktop: Left 55% text + principles, Right 45% visual
        Mobile: Clean natural vertical stack
        -------------------------------------------------------------
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
        <div className="w-full lg:w-[56%] xl:w-[54%] flex flex-col items-start text-left">
          
          {/* 1. Eyebrow: ABOUT MAHRIS */}
          <motion.div
            custom={0.1}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="inline-flex items-center gap-2.5 mb-4 sm:mb-5"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#A78BFA] uppercase">
              ABOUT MAHRIS
            </span>
          </motion.div>

          {/* 
            2. Main Heading Wrapper & Heading
            z-index: 20
            Protected against clipping; overflow is scoped only to individual line masks
          */}
          <div
            ref={headingWrapperRef}
            className="about-heading-wrapper relative z-20 w-full my-4 sm:my-5"
          >
            <h2 className="about-heading relative z-20 text-[2.2rem] leading-[1.08] sm:text-5xl sm:leading-[1.08] md:text-6xl md:leading-[1.06] lg:text-[3.75rem] lg:leading-[1.05] xl:text-[4.35rem] xl:leading-[1.04] font-bold tracking-[-0.03em] text-white uppercase">
              {/* Line 1 */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  custom={1}
                  variants={lineVariants}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  className="block text-white"
                >
                  WE TURN IDEAS
                </motion.div>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  custom={2}
                  variants={lineVariants}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  className="block text-white"
                >
                  INTO DIGITAL
                </motion.div>
              </div>

              {/* Line 3 - MaHris Purple */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  custom={3}
                  variants={lineVariants}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  className="block text-[#8B5CF6] drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]"
                >
                  SOLUTIONS THAT
                </motion.div>
              </div>

              {/* Line 4 - MaHris Purple */}
              <div className="overflow-hidden py-0.5">
                <motion.div
                  custom={4}
                  variants={lineVariants}
                  initial="hidden"
                  animate={isVisible ? 'visible' : 'hidden'}
                  className="block text-[#8B5CF6] drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]"
                >
                  CREATE REAL IMPACT.
                </motion.div>
              </div>
            </h2>
          </div>

          {/* Line Divider Accent */}
          <motion.div
            custom={0.55}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="w-10 h-[2px] bg-[#8B5CF6]/70 rounded-full mb-5 sm:mb-6"
            aria-hidden="true"
          />

          {/* 3. Description Paragraph */}
          <motion.p
            custom={0.65}
            variants={fadeUpVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="text-sm sm:text-base md:text-[16px] leading-relaxed text-zinc-300/90 max-w-xl mb-8 lg:mb-10 font-normal"
          >
            MaHris is a digital solutions studio focused on building modern
            websites, applications, and intelligent automation that help
            businesses grow, operate efficiently, and stay ahead in a
            digital-first world.
          </motion.p>
        </div>

        {/* 
          -------------------------------------------------------------
          MOBILE VISUAL PRESENTATION (< lg only)
          Naturally stacks: ABOUT -> Headline -> Description -> Visual -> Principles
          -------------------------------------------------------------
        */}
        <motion.div
          custom={0.75}
          variants={fadeUpVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="lg:hidden w-full my-8 sm:my-10"
        >
          <div className="relative w-full max-w-md mx-auto aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#08080C] shadow-[0_0_40px_rgba(139,92,246,0.12)]">
            <img
              src="/images/about-background.png"
              alt="MaHris Visual"
              className="w-full h-full object-cover object-[85%_center] select-none pointer-events-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
          </div>
        </motion.div>

        {/* 
          -------------------------------------------------------------
          4. FOUR CORE PRINCIPLES
          Horizontal on desktop with subtle vertical separators.
          Compact, integrated, minimal line icons.
          -------------------------------------------------------------
        */}
        <motion.div
          variants={principlesContainerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="w-full lg:w-[58%] xl:w-[56%] pt-2"
          aria-label="Four Core Principles"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              const isHovered = hoveredIndex === idx;
              const hasActiveHover = hoveredIndex !== null;
              const isMuted = hasActiveHover && !isHovered;

              return (
                <motion.div
                  key={item.number}
                  variants={principleItemVariants}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative flex flex-col items-start transition-all duration-300 cursor-default lg:pl-5 lg:pr-3 lg:border-l lg:border-white/[0.08] lg:first:border-l-0 lg:first:pl-0 sm:even:border-l sm:even:border-white/[0.08] sm:even:pl-4 sm:odd:pl-0 sm:odd:border-l-0 ${
                    isMuted ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  {/* Top: Icon + Subtle Number */}
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className="relative flex items-center justify-center">
                      <Icon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isHovered
                            ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.7)]'
                            : 'text-zinc-300'
                        }`}
                      />
                      {isHovered && (
                        <span
                          className="absolute -inset-1 rounded-full bg-purple-500/15 blur-sm pointer-events-none"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <span className="text-[11px] font-mono font-medium text-purple-400/60 tracking-wider">
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xs font-semibold tracking-[0.14em] uppercase mb-1.5 transition-colors duration-300 ${
                      isHovered ? 'text-white' : 'text-zinc-200'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[12px] sm:text-[13px] text-zinc-400/90 leading-snug">
                    {item.description}
                  </p>

                  {/* Subtle purple accent indicator */}
                  <div
                    className={`h-[1.5px] bg-purple-500 mt-3 transition-all duration-300 rounded-full ${
                      isHovered ? 'w-6 opacity-100' : 'w-0 opacity-0'
                    }`}
                    aria-hidden="true"
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;

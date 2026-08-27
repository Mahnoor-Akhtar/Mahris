import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { ScrollIndicator } from './ScrollIndicator';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop screen and hover capability
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

  // Subtle Mouse Parallax (5-8px maximum displacement, desktop only)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop || shouldReduceMotion) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const normalizedX = (clientX / innerWidth - 0.5) * 2;
      const normalizedY = (clientY / innerHeight - 0.5) * 2;

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

  // =========================================================================
  // HIGH-OCTANE ELECTRIC PURPLE LIGHTNING & PLASMA FLAME ENGINE
  // =========================================================================
  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle / Ember Class for Rising Electric Flame Sparks
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      decay: number;
      color: string;
    }

    const sparks: Spark[] = [];
    const sparkColors = ['#FFFFFF', '#DDD6FE', '#A78BFA', '#8B5CF6', '#7C3AED'];

    const createSpark = (originX: number, originY: number): Spark => {
      const angle = (Math.random() * Math.PI) / 2 + Math.PI / 4; // Upward bias
      const speed = Math.random() * 2.5 + 1;
      return {
        x: originX + (Math.random() - 0.5) * 140,
        y: originY + (Math.random() - 0.5) * 140,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.sin(angle) * speed,
        size: Math.random() * 2.2 + 0.8,
        alpha: Math.random() * 0.8 + 0.2,
        decay: Math.random() * 0.015 + 0.008,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
      };
    };

    // Lightning Bolt Generation (Fractal Midpoint Displacement)
    interface Point {
      x: number;
      y: number;
    }

    const generateLightningPath = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number,
      iteration: number
    ): Point[] => {
      if (iteration <= 0) {
        return [
          { x: x1, y: y1 },
          { x: x2, y: y2 },
        ];
      }

      const midX = (x1 + x2) / 2 + (Math.random() - 0.5) * displace;
      const midY = (y1 + y2) / 2 + (Math.random() - 0.5) * displace;

      const left = generateLightningPath(x1, y1, midX, midY, displace / 1.8, iteration - 1);
      const right = generateLightningPath(midX, midY, x2, y2, displace / 1.8, iteration - 1);

      return left.slice(0, -1).concat(right);
    };

    interface LightningBolt {
      points: Point[];
      branches: Point[][];
      alpha: number;
      decay: number;
      width: number;
    }

    const lightningBolts: LightningBolt[] = [];
    let lastBoltTime = 0;

    const spawnLightningBolt = (targetX: number, targetY: number) => {
      // Pick random origin point around logo perimeter / bottom
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 180 + 160;
      const startX = targetX + Math.cos(angle) * radius;
      const startY = targetY + Math.sin(angle) * radius + (Math.random() * 80 - 20);

      const mainPoints = generateLightningPath(startX, startY, targetX, targetY, 70, 5);

      // Create occasional branching fork
      const branches: Point[][] = [];
      if (Math.random() > 0.3 && mainPoints.length > 8) {
        const branchStartIndex = Math.floor(mainPoints.length * 0.4);
        const bStart = mainPoints[branchStartIndex];
        const bEndX = bStart.x + (Math.random() - 0.5) * 120;
        const bEndY = bStart.y + (Math.random() - 0.5) * 120;
        branches.push(generateLightningPath(bStart.x, bStart.y, bEndX, bEndY, 40, 3));
      }

      lightningBolts.push({
        points: mainPoints,
        branches,
        alpha: 1.0,
        decay: Math.random() * 0.08 + 0.05,
        width: Math.random() * 2 + 1.2,
      });
    };

    // Plasma Flame Tongue Parameters
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Logo center coordinates (Right half on desktop, centered on mobile)
      const isWide = width >= 1024;
      const logoX = isWide ? width * 0.74 : width * 0.5;
      const logoY = isWide ? height * 0.48 : height * 0.45;

      time += 0.03;

      // -------------------------------------------------------------
      // 1. RISING PLASMA FLAME TONGUES (Layered Sine Flames)
      // -------------------------------------------------------------
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      const flameCount = isWide ? 7 : 4;
      for (let i = 0; i < flameCount; i++) {
        const flameOffset = (i - flameCount / 2) * 35;
        const flameHeight = 180 + Math.sin(time * 2 + i) * 45;
        const baseWidth = 45 + Math.cos(time * 1.5 + i) * 15;

        const startX = logoX + flameOffset;
        const startY = logoY + 120;
        const tipX = startX + Math.sin(time * 3 + i * 2) * 30;
        const tipY = startY - flameHeight;

        const gradient = ctx.createLinearGradient(startX, startY, tipX, tipY);
        gradient.addColorStop(0, 'rgba(124, 58, 237, 0)');
        gradient.addColorStop(0.3, 'rgba(139, 92, 246, 0.35)');
        gradient.addColorStop(0.7, 'rgba(167, 139, 250, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.85)');

        ctx.beginPath();
        ctx.moveTo(startX - baseWidth, startY);
        ctx.quadraticCurveTo(
          startX - baseWidth * 0.6,
          startY - flameHeight * 0.5,
          tipX,
          tipY
        );
        ctx.quadraticCurveTo(
          startX + baseWidth * 0.6,
          startY - flameHeight * 0.5,
          startX + baseWidth,
          startY
        );
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.filter = 'blur(6px)';
        ctx.fill();
        ctx.filter = 'none';
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 2. CRACKLING ELECTRIC LIGHTNING BOLTS
      // -------------------------------------------------------------
      // Spawn new bolt periodically
      const now = performance.now();
      if (now - lastBoltTime > 180 + Math.random() * 220) {
        spawnLightningBolt(logoX, logoY);
        lastBoltTime = now;
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = lightningBolts.length - 1; i >= 0; i--) {
        const bolt = lightningBolts[i];

        if (bolt.points.length > 1) {
          // Outer Glow
          ctx.beginPath();
          ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
          for (let j = 1; j < bolt.points.length; j++) {
            ctx.lineTo(bolt.points[j].x, bolt.points[j].y);
          }
          ctx.strokeStyle = `rgba(139, 92, 246, ${bolt.alpha * 0.6})`;
          ctx.lineWidth = bolt.width * 3.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();

          // Inner Hot Core
          ctx.beginPath();
          ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
          for (let j = 1; j < bolt.points.length; j++) {
            ctx.lineTo(bolt.points[j].x, bolt.points[j].y);
          }
          ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.alpha * 0.95})`;
          ctx.lineWidth = bolt.width;
          ctx.stroke();

          // Draw Branches
          for (const branch of bolt.branches) {
            if (branch.length > 1) {
              ctx.beginPath();
              ctx.moveTo(branch[0].x, branch[0].y);
              for (let k = 1; k < branch.length; k++) {
                ctx.lineTo(branch[k].x, branch[k].y);
              }
              ctx.strokeStyle = `rgba(167, 139, 250, ${bolt.alpha * 0.7})`;
              ctx.lineWidth = bolt.width * 0.7;
              ctx.stroke();
            }
          }
        }

        bolt.alpha -= bolt.decay;
        if (bolt.alpha <= 0) {
          lightningBolts.splice(i, 1);
        }
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 3. ELECTRIC SPARK PARTICLES & RISING EMBERS
      // -------------------------------------------------------------
      if (sparks.length < 40 && Math.random() > 0.3) {
        sparks.push(createSpark(logoX, logoY + 40));
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.x += spark.vx + (Math.random() - 0.5) * 0.8;
        spark.y += spark.vy;
        spark.alpha -= spark.decay;

        if (spark.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = spark.alpha;
        ctx.shadowColor = '#8B5CF6';
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  // Motion animation variants for typography
  const lineVariants: Variants = {
    hidden: { y: '110%', opacity: shouldReduceMotion ? 1 : 0 },
    visible: (custom: number) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.85,
        delay: shouldReduceMotion ? 0.05 * custom : 0.25 + custom * 0.12,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.75,
        delay: shouldReduceMotion ? 0.1 : delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#050507] select-none"
      aria-label="MaHris Digital Solutions Studio Hero"
    >
      {/* 
        -------------------------------------------------------------
        HERO BACKGROUND IMAGE & SUBTLE PARALLAX
        Uses exact image: public/images/mahris-hero-bg.png
        -------------------------------------------------------------
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
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
          className="relative w-full h-full scale-[1.04] origin-center"
        >
          <img
            src="/images/mahris-hero-bg.png"
            alt="MaHris 3D metallic visual"
            className="w-full h-full object-cover object-[75%_center] sm:object-[70%_center] lg:object-right xl:object-center select-none pointer-events-none"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        {/* 
          =============================================================
          ELECTRIC LIGHTNING & PLASMA FLAME CANVAS OVERLAY
          =============================================================
        */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-90"
        />

        {/* 
          Left-side subtle dark vignette/gradient overlay
          Only primarily affects the left text area for crisp contrast
          Does NOT dull the metallic MaHris visual on the right
        */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#050507]/90 via-[#050507]/60 to-transparent lg:w-[65%] pointer-events-none z-[2]"
          aria-hidden="true"
        />

        {/* Mobile top & bottom subtle fade for readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#050507]/50 via-transparent to-[#050507]/80 lg:hidden pointer-events-none z-[2]"
          aria-hidden="true"
        />
      </div>

      {/* 
        -------------------------------------------------------------
        HERO CONTENT
        Placed on the left side, constrained to ~45-50% desktop width
        -------------------------------------------------------------
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl flex flex-col items-start text-left">
          
          {/* Eyebrow */}
          <motion.div
            custom={0.15}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2.5 mb-5 sm:mb-6"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#A78BFA] uppercase">
              DIGITAL SOLUTIONS STUDIO
            </span>
          </motion.div>

          {/* Main Headline (Masked Line-by-Line Reveal) */}
          <h1 className="text-[2.25rem] leading-[1.08] sm:text-5xl sm:leading-[1.08] md:text-6xl md:leading-[1.06] lg:text-[4.15rem] lg:leading-[1.05] xl:text-[4.75rem] xl:leading-[1.04] font-bold tracking-[-0.03em] text-white uppercase mb-6 sm:mb-7">
            {/* Line 1 */}
            <span className="block overflow-hidden py-0.5">
              <motion.span
                custom={1}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block text-white"
              >
                WE BUILD DIGITAL
              </motion.span>
            </span>

            {/* Line 2 */}
            <span className="block overflow-hidden py-0.5">
              <motion.span
                custom={2}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block text-white"
              >
                EXPERIENCES THAT
              </motion.span>
            </span>

            {/* Line 3 - MaHris Purple */}
            <span className="block overflow-hidden py-0.5">
              <motion.span
                custom={3}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block text-[#8B5CF6] drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]"
              >
                MOVE BUSINESSES
              </motion.span>
            </span>

            {/* Line 4 - MaHris Purple */}
            <span className="block overflow-hidden py-0.5">
              <motion.span
                custom={4}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="block text-[#8B5CF6] drop-shadow-[0_0_25px_rgba(139,92,246,0.3)]"
              >
                FORWARD.
              </motion.span>
            </span>
          </h1>

          {/* Description */}
          <motion.p
            custom={0.75}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-sm sm:text-base md:text-[17px] leading-relaxed text-zinc-300/90 max-w-md lg:max-w-lg mb-8 sm:mb-10 font-normal"
          >
            MaHris designs and develops websites, applications, AI-powered
            automation and user experiences that help businesses operate,
            grow and stand out.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={0.9}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-white bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.55)] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400 focus-visible:ring-offset-[#050507]"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#services"
              className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-zinc-200 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/15 hover:border-purple-400/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-400 focus-visible:ring-offset-[#050507]"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowDown className="w-4 h-4 text-zinc-400 group-hover:text-purple-300 transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </motion.div>

        </div>
      </div>

      {/* 
        -------------------------------------------------------------
        SCROLL INDICATOR (Bottom Left)
        -------------------------------------------------------------
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8 sm:pb-10">
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default Hero;

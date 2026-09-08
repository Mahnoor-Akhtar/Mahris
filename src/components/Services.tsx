import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    id: 'ugc-ads',
    number: '01',
    title: 'UGC ADS',
    description:
      'High-converting user-generated content ads tailored to captivate audiences and drive sales.',
  },
  {
    id: 'ai-cartoon-ads',
    number: '02',
    title: 'AI CARTOON ADS',
    description:
      'Engaging animated & AI-generated cartoon ad campaigns designed for viral brand reach and impact.',
  },
  {
    id: 'websites',
    number: '03',
    title: 'WEBSITES',
    description:
      'High-performance websites designed to represent your brand and turn visitors into customers.',
  },
  {
    id: 'mobile-app',
    number: '04',
    title: 'MOBILE APP',
    description:
      'Native and cross-platform mobile applications built around real users, real problems and growth.',
  },
  {
    id: 'automation',
    number: '05',
    title: 'AUTOMATION',
    description:
      'Intelligent AI workflows that automate repetitive tasks, optimize operations, and scale faster.',
  },
  {
    id: 'softwares',
    number: '06',
    title: 'SOFTWARES',
    description:
      'Custom enterprise software systems, robust APIs, and SaaS platforms engineered for high performance.',
  },
  {
    id: 'custom-solutions',
    number: '07',
    title: 'CUSTOM SOLUTIONS',
    description:
      'Tailored digital systems and custom technology solutions built around your unique business needs.',
  },
];

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);

  // Dynamic inView check (plays video when Services is in viewport, pauses when scrolled away up or down)
  const isSectionInView = useInView(sectionRef, { amount: 0.15 });

  // Preload video for instant, smooth, zero-stutter playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isSectionInView) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setShowSoundPrompt(false);
          })
          .catch((error) => {
            console.log('Unmuted autoplay prevented by browser policy, resorting to muted autoplay:', error);
            video.muted = true;
            setIsMuted(true);
            setShowSoundPrompt(true);
            video.play().catch(() => {});
          });
      }
    } else {
      video.pause();
    }
  }, [isSectionInView, isMuted]);

  // First user interaction listener to enable audio if browser blocked initial unmuted play
  useEffect(() => {
    const handleUserInteraction = () => {
      if (videoRef.current && isSectionInView) {
        videoRef.current.muted = false;
        videoRef.current.play().then(() => {
          setIsMuted(false);
          setShowSoundPrompt(false);
        }).catch(() => {});
      }
    };

    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [isSectionInView]);

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        setShowSoundPrompt(false);
        video.play().catch(() => {});
      }
    }
  };

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

    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
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
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  // Handle service click: activate, auto-select service in form, and scroll smoothly to #contact form section
  const handleServiceSelect = (index: number) => {
    setActiveIndex(index);

    const serviceTitle = services[index]?.title;
    const serviceToFormMap: { [key: string]: string } = {
      'UGC ADS': 'Branding & Graphic Design',
      'AI CARTOON ADS': 'Branding & Graphic Design',
      'WEBSITES': 'Website Development',
      'MOBILE APP': 'Mobile App Development',
      'AUTOMATION': 'Custom Software Solution',
      'SOFTWARES': 'Web Application Development',
      'CUSTOM SOLUTIONS': 'Custom Software Solution',
    };

    if (serviceTitle && serviceToFormMap[serviceTitle]) {
      window.dispatchEvent(
        new CustomEvent('mahris:select-service', { detail: serviceToFormMap[serviceTitle] })
      );
    }

    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full bg-[#050507] py-14 sm:py-18 lg:py-20 select-none border-t border-white/[0.04] overflow-hidden"
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
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20 lg:mb-24">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center gap-2.5 mb-4"
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
            className="text-sm sm:text-base md:text-[16px] leading-relaxed text-zinc-300/90 max-w-xl mx-auto font-normal"
          >
            End-to-end digital solutions that help businesses grow, operate smarter and scale faster.
          </motion.p>
        </div>

        {/* 
          -------------------------------------------------------------
          DESKTOP LAYOUT
          LEFT: Refined editorial service list (50%)
          RIGHT: SINGLE 9:16 PORTRAIT AUTOPLAY VIDEO SHOWCASE WITH VOICE (50%)
          -------------------------------------------------------------
        */}
        <div className="hidden lg:flex items-center justify-between gap-10 xl:gap-16 relative min-h-[75vh]">
          {/* Left Column: Interactive Service List */}
          <div className="w-[50%] xl:w-[48%] flex flex-col gap-5 py-4 z-20 shrink-0">
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
            Right Column: 9:16 PORTRAIT VIDEO STAGE
            - Sticky while scrolling
            - Displays in exact 9:16 portrait ratio without cropping
          */}
          <div className="w-[50%] xl:w-[52%] sticky top-16 h-[calc(100vh-4rem)] min-h-[650px] flex flex-col items-center justify-center z-10 pointer-events-none">
            <div
              ref={showcaseRef}
              className="relative w-full flex flex-col items-center justify-center pointer-events-auto"
            >
              {/* Atmospheric Purple Radial Light BEHIND visual */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[650px] rounded-full pointer-events-none -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent 65%)',
                }}
                aria-hidden="true"
              />

              {/* PORTRAIT 9:16 VIDEO CONTAINER WITH HARDWARE GPU ACCELERATION */}
              <div className="relative flex items-center justify-center">
                <div
                  className="relative w-[340px] xl:w-[380px] aspect-[9/16] overflow-hidden rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_80px_rgba(139,92,246,0.25)] bg-black/90 border border-white/[0.12]"
                  style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
                >
                  <video
                    ref={isDesktop ? videoRef : null}
                    src="/videos/Mahris.mp4"
                    preload="auto"
                    autoPlay
                    loop
                    playsInline
                    muted={isMuted}
                    className="w-full h-full object-cover select-none filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    style={{ transform: 'translate3d(0,0,0)' }}
                  />

                  {/* Frame edge ring */}
                  <div
                    className="absolute inset-0 ring-1 ring-inset ring-white/[0.12] rounded-3xl pointer-events-none z-10"
                    aria-hidden="true"
                  />

                  {/* Sound Toggle Button & Prompt */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3">
                    {showSoundPrompt && isMuted && (
                      <button
                        onClick={toggleSound}
                        className="px-3.5 py-1.5 rounded-full bg-purple-600/90 hover:bg-purple-500 text-white text-xs font-semibold backdrop-blur-md border border-purple-400/40 shadow-lg animate-pulse transition-all flex items-center gap-2"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Enable Sound</span>
                      </button>
                    )}
                    <button
                      onClick={toggleSound}
                      aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
                      className="p-3 rounded-full bg-black/60 hover:bg-purple-600/90 text-white border border-white/20 backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-zinc-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-purple-300" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 
          -------------------------------------------------------------
          MOBILE & TABLET LAYOUT (< lg)
          Single 9:16 Portrait Video + Services List
          -------------------------------------------------------------
        */}
        <div className="lg:hidden flex flex-col gap-12">
          {/* Single Mobile Autoplay 9:16 Portrait Video Stage */}
          <div className="relative w-full max-w-[320px] sm:max-w-[350px] mx-auto aspect-[9/16] rounded-3xl overflow-hidden bg-[#07070B] border border-white/[0.1] shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(139,92,246,0.18)]">
            <video
              ref={!isDesktop ? videoRef : null}
              src="/videos/Mahris.mp4"
              preload="auto"
              autoPlay
              loop
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover select-none"
              style={{ transform: 'translate3d(0,0,0)' }}
            />
            <div
              className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none z-10"
              aria-hidden="true"
            />
            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
              className="absolute bottom-3 right-3 p-2.5 rounded-full bg-black/70 text-white border border-white/20 backdrop-blur-md z-20 flex items-center justify-center"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-purple-300" />
              )}
            </button>
          </div>

          {/* Services List */}
          <div className="flex flex-col gap-6">
            {services.map((item, idx) => (
              <div
                key={`mobile-${item.id}`}
                onClick={() => handleServiceSelect(idx)}
                className="group flex flex-col items-start text-left w-full border-t border-white/[0.06] pt-6 first:border-t-0 first:pt-0 cursor-pointer p-4 rounded-2xl hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex items-center justify-between w-full mb-2.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[#A78BFA] bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                      {item.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-white uppercase group-hover:text-[#A78BFA] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[#A78BFA] group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-300 max-w-xl mb-3">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A78BFA] group-hover:text-purple-300 transition-colors">
                  Request Service <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

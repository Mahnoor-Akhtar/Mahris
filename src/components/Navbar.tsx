import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('SERVICES');

  // Auto-hide when scrolling down, reveal when scrolling up or hovering top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 25);

      if (mobileMenuOpen) {
        setVisible(true);
        return;
      }

      if (currentScrollY <= 40) {
        // At the top of the page -> always visible
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 70) {
        // Scrolling down -> hide navbar
        setVisible(false);
      } else if (currentScrollY < lastScrollY - 4) {
        // Scrolling up -> reveal navbar
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Reveal navbar when cursor moves to the top area of the window
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 85) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY, mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'SERVICES', href: '#services' },
    { name: 'WORK', href: '#work' },
    { name: 'PROCESS', href: '#process' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-7 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible || mobileMenuOpen
          ? 'translate-y-0 opacity-100 pointer-events-none'
          : '-translate-y-32 opacity-0 pointer-events-none'
      }`}
    >
      {/* 
        =============================================================
        FLOATING PREMIUM CAPSULE CONTAINER
        =============================================================
      */}
      <div
        className={`pointer-events-auto relative w-full max-w-[1400px] mx-auto rounded-2xl lg:rounded-[26px] bg-[#07070D]/90 backdrop-blur-xl border border-purple-500/25 shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_35px_rgba(139,92,246,0.18)] transition-all duration-300 overflow-hidden ${
          scrolled ? 'py-3 sm:py-3.5 px-5 sm:px-7 lg:px-8' : 'py-4 sm:py-5 px-6 sm:px-8 lg:px-10'
        }`}
      >
        {/* Subtle animated purple flowing light trails behind navigation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
          <svg
            viewBox="0 0 1400 100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <motion.path
              d="M600,80 C800,20 1000,90 1400,30"
              stroke="#8B5CF6"
              strokeWidth="1.2"
              strokeDasharray="6 8"
              animate={!shouldReduceMotion ? { strokeDashoffset: [0, -100] } : {}}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <motion.path
              d="M750,90 C950,40 1150,70 1400,50"
              stroke="#A78BFA"
              strokeWidth="0.8"
              strokeOpacity="0.7"
              animate={!shouldReduceMotion ? { strokeDashoffset: [0, 80] } : {}}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </div>

        {/* Ambient bottom glowing flares */}
        <div
          className="absolute -bottom-6 left-1/4 w-48 h-12 bg-purple-500/20 blur-xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-6 right-1/4 w-48 h-12 bg-purple-500/20 blur-xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Navbar Inner Content */}
        <div className="relative z-10 flex items-center justify-between gap-4">
          
          {/* ================= 1. LOGO & BRAND AREA ================= */}
          <a
            href="/"
            className="flex items-center gap-3.5 sm:gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-xl"
            aria-label="MaHris Home"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 lg:w-13 lg:h-13 shrink-0">
              <img
                src="/images/mahris-logo.png"
                alt="MaHris 3D Emblem"
                className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-transform duration-300"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl sm:text-2xl lg:text-[26px] tracking-tight leading-none text-white">
                Ma<span className="text-[#8B5CF6] drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]">Hris</span>
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_#8B5CF6]" />
                <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-bold tracking-[0.22em] text-zinc-400 uppercase">
                  DIGITAL SOLUTIONS STUDIO
                </span>
              </div>
            </div>
          </a>

          {/* ================= 2. CENTER DESKTOP NAVIGATION ================= */}
          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-9"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeNav === link.name;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveNav(link.name)}
                  className={`group relative text-xs xl:text-[13px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 rounded ${
                    isActive
                      ? 'text-white drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>

                  {/* Animated Glowing Purple Underline */}
                  <span
                    className={`absolute bottom-0 inset-x-0 h-[2px] rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6] transition-all duration-300 ${
                      isActive
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* ================= 3. RIGHT CTA & HAMBURGER BUTTON ================= */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Primary Action Button */}
            <a
              href="#contact"
              className="hidden sm:inline-flex group relative items-center justify-center gap-2.5 px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 rounded-full text-xs lg:text-[13px] font-semibold tracking-[0.14em] uppercase text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] shadow-[0_0_20px_rgba(139,92,246,0.45)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-300 hover:-translate-y-0.5 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Circular Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 lg:hidden rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 text-white flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-[0_0_15px_#8B5CF6] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 shrink-0 group"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <span
                className={`w-5 h-[1.5px] bg-white rounded-full transition-transform duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-white rounded-full transition-opacity duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-white rounded-full transition-transform duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''
                }`}
              />
            </button>
          </div>

        </div>
      </div>

      {/* 
        =============================================================
        MOBILE & TABLET FULL NAVIGATION OVERLAY
        =============================================================
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative w-full max-w-[1400px] mx-auto mt-3 rounded-2xl bg-[#09090F]/95 backdrop-blur-2xl border border-purple-500/30 p-7 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(139,92,246,0.2)] z-50 overflow-hidden"
          >
            <nav className="flex flex-col gap-5" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <a
                  key={`mob-${link.name}`}
                  href={link.href}
                  onClick={() => {
                    setActiveNav(link.name);
                    setMobileMenuOpen(false);
                  }}
                  className="text-base sm:text-lg font-bold tracking-[0.16em] uppercase text-zinc-200 hover:text-[#A78BFA] py-2 border-b border-white/5 transition-colors flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </a>
              ))}
              <div className="pt-3">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  TrendingUp,
  LifeBuoy,
  ChevronDown,
  Search,
  CheckCircle2,
  Check,
  AlertCircle,
  Loader2,
  RotateCcw,
  Sparkles,
  MessageCircle,
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

const serviceOptions = [
  'Website Development',
  'Web Application Development',
  'Mobile App Development',
  'UI/UX Design',
  'E-Commerce Development',
  'SEO & Digital Marketing',
  'Branding & Graphic Design',
  'Custom Software Solution',
  'Website Maintenance',
  'Other',
];

const WHATSAPP_NUMBER = '923147238942'; // +92 314 7238942

export const CTA: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '0px 0px -60px 0px' });

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [projectDetails, setProjectDetails] = useState('');

  // Dropdown & Validation State
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    phone: string;
    service: string;
    details: string;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-select service when triggered from Services section click
  useEffect(() => {
    const handleServiceSelection = (e: Event) => {
      const customEvt = e as CustomEvent<string>;
      if (customEvt.detail) {
        setSelectedService(customEvt.detail);
        setErrors((prev) => ({ ...prev, service: '' }));
      }
    };
    window.addEventListener('mahris:select-service', handleServiceSelection);
    return () => {
      window.removeEventListener('mahris:select-service', handleServiceSelection);
    };
  }, []);

  // Close custom dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility for dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setDropdownOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (!dropdownOpen) {
        e.preventDefault();
        setDropdownOpen(true);
      }
    }
  };

  // Validation logic
  const validateField = (field: string, value: string): string => {
    if (field === 'fullName') {
      if (!value.trim()) return 'Full name is required';
      if (value.trim().length < 2) return 'Full name must be at least 2 characters';
    }
    if (field === 'email') {
      if (!value.trim()) return 'Email address is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
    }
    if (field === 'phone') {
      if (!value.trim()) return 'Phone number is required';
      const phoneRegex = /^[+]?[0-9\s-]{7,18}$/;
      if (!phoneRegex.test(value.trim())) return 'Please enter a valid phone number';
    }
    if (field === 'service') {
      if (!value) return 'Please select a service';
    }
    return '';
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let val = '';
    if (field === 'fullName') val = fullName;
    if (field === 'email') val = email;
    if (field === 'phone') val = phone;
    if (field === 'service') val = selectedService;

    const err = validateField(field, val);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const validateAll = (): boolean => {
    const newErrors: { [key: string]: string } = {
      fullName: validateField('fullName', fullName),
      email: validateField('email', email),
      phone: validateField('phone', phone),
      service: validateField('service', selectedService),
    };

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      service: true,
    });
    setErrors(newErrors);

    return !Object.values(newErrors).some((e) => e !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);

    // Formatted WhatsApp payload construction
    const messageDetails = projectDetails.trim() ? projectDetails.trim() : 'N/A';
    const waText =
      `NEW SERVICE REQUEST\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `Name: ${fullName.trim()}\n` +
      `Email: ${email.trim()}\n` +
      `Phone: ${phone.trim()}\n` +
      `Service: ${selectedService}\n\n` +
      `Project Details:\n` +
      `${messageDetails}\n\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `Submitted via MaHris Website`;

    const encodedMessage = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Store summary for success card state
    setSubmittedData({
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service: selectedService,
      details: messageDetails,
    });

    setTimeout(() => {
      // Open WhatsApp chat in new tab safely
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setSelectedService('');
    setProjectDetails('');
    setTouched({});
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  const filteredServices = serviceOptions.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#050507] py-14 sm:py-18 lg:py-20 select-none border-t border-white/[0.04] overflow-hidden"
      aria-label="Contact & Service Request MaHris"
    >
      {/* 
        =============================================================
        CINEMATIC 3D BACKGROUND ARTWORK
        Using public/images/cta-background.png
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

          <linearGradient id="ringTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#C4B5FD" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
          </linearGradient>
        </defs>

        {!shouldReduceMotion && (
          <>
            <path
              d="M 960, 135 a 305,305 0 1,1 -0.1,0"
              stroke="url(#ringTrailGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="180 1740"
              className="animate-ring-beam"
              filter="url(#blazeGlowCore)"
            />
            <circle r="4.5" fill="#FFFFFF" filter="url(#blazeGlowCore)">
              <animateMotion
                path="M 960, 135 a 305,305 0 1,1 -0.1,0"
                dur="6.5s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </svg>

      {/* Atmospheric Vignette Gradients */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/90 to-transparent pointer-events-none z-[3]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507] pointer-events-none z-[3]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* 
          -------------------------------------------------------------
          TWO-COLUMN DESKTOP / STACKED MOBILE SERVICE REQUEST LAYOUT
          -------------------------------------------------------------
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: Contact / Brand Information ================= */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-20">
            
            {/* MaHris Logo Brand */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <img
                src="/images/mahris-logo.png"
                alt="MaHris Logo"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </motion.div>

            {/* Section Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 mb-4"
            >
              <span
                className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]"
                aria-hidden="true"
              />
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[#A78BFA] uppercase">
                GET IN TOUCH
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold tracking-tight uppercase leading-[1.2] sm:leading-[1.18] mb-5"
            >
              <span className="block text-white">READY TO BUILD</span>
              <span className="block text-[#8B5CF6] drop-shadow-[0_0_30px_rgba(139,92,246,0.35)] mt-1">
                SOMETHING REMARKABLE?
              </span>
            </motion.h2>

            {/* Explanatory Body Copy */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-zinc-300/90 leading-relaxed max-w-lg mb-8 font-normal"
            >
              Tell us what you need and our team will get in touch with you. We partner with ambitious businesses to engineer digital solutions that drive real growth.
            </motion.p>

            {/* Contact Details List */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 w-full mb-8"
            >
              {/* Phone / WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                    Phone / WhatsApp
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    +92 314 7238942
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:mahris.digital@gmail.com"
                className="group flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-[#A78BFA] group-hover:scale-110 transition-transform shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                    Email Address
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#A78BFA] transition-colors">
                    mahris.digital@gmail.com
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                    Location
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Pakistan
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Premium Tagline Badge & Trust Line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4 pt-2"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Your Vision / Our Technology</span>
              </div>

              {/* Social Proof Line */}
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center">
                  {avatars.map((avatar, idx) => (
                    <div
                      key={avatar.initials}
                      className={`w-6 h-6 rounded-full border-2 border-[#050507] -ml-2 first:ml-0 ${avatar.bg} text-[9px] font-bold flex items-center justify-center shadow-sm`}
                      style={{ zIndex: 10 - idx }}
                    >
                      {avatar.initials}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  <span className="text-xs text-zinc-400">
                    <strong className="text-zinc-200 font-semibold">50+ businesses</strong> already growing with MaHris
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ================= RIGHT COLUMN: Service Request Form Card (~55%) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 z-20"
          >
            <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#07070B]/90 backdrop-blur-xl border border-white/[0.1] shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_60px_rgba(139,92,246,0.15)] p-6 sm:p-8 md:p-10 overflow-hidden">
              
              {/* Card Accent Top Glow */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-32 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form-step"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Form Header */}
                    <div className="mb-6 sm:mb-8 text-left">
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-white uppercase mb-2">
                        Request Our Services
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        Complete the form below and let us know what you need. We&apos;ll get back to you soon.
                      </p>
                    </div>

                    {/* Service Request Form */}
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 text-left">
                      
                      {/* Row 1: Full Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* Full Name Field */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="fullName" className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                            Full Name <span className="text-purple-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              if (touched.fullName) handleBlur('fullName');
                            }}
                            onBlur={() => handleBlur('fullName')}
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-zinc-500 transition-all outline-none focus:bg-white/[0.06] ${
                              touched.fullName && errors.fullName
                                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50'
                                : 'border-white/[0.12] focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50'
                            }`}
                          />
                          {touched.fullName && errors.fullName && (
                            <span className="text-xs text-rose-400 flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.fullName}</span>
                            </span>
                          )}
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                            Email Address <span className="text-purple-400">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (touched.email) handleBlur('email');
                            }}
                            onBlur={() => handleBlur('email')}
                            placeholder="Enter your email"
                            className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-zinc-500 transition-all outline-none focus:bg-white/[0.06] ${
                              touched.email && errors.email
                                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50'
                                : 'border-white/[0.12] focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50'
                            }`}
                          />
                          {touched.email && errors.email && (
                            <span className="text-xs text-rose-400 flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.email}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Phone Number & Custom Service Dropdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* Phone Number Field */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="phone" className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                            Phone Number <span className="text-purple-400">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (touched.phone) handleBlur('phone');
                            }}
                            onBlur={() => handleBlur('phone')}
                            placeholder="+92 3XX XXXXXXX"
                            className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-zinc-500 transition-all outline-none focus:bg-white/[0.06] ${
                              touched.phone && errors.phone
                                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50'
                                : 'border-white/[0.12] focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50'
                            }`}
                          />
                          {touched.phone && errors.phone && (
                            <span className="text-xs text-rose-400 flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.phone}</span>
                            </span>
                          )}
                        </div>

                        {/* Custom Modern Service Dropdown */}
                        <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
                          <label className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                            Service You Need <span className="text-purple-400">*</span>
                          </label>
                          
                          <button
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            onKeyDown={handleKeyDown}
                            onBlur={() => handleBlur('service')}
                            aria-haspopup="listbox"
                            aria-expanded={dropdownOpen}
                            className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-sm flex items-center justify-between transition-all outline-none cursor-pointer ${
                              touched.service && errors.service
                                ? 'border-rose-500/80 text-white'
                                : 'border-white/[0.12] text-white hover:border-white/20 focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50'
                            }`}
                          >
                            <span className={selectedService ? 'text-white font-medium' : 'text-zinc-500'}>
                              {selectedService || 'Select a service...'}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-purple-400' : ''}`} />
                          </button>

                          {/* Interactive Dropdown Menu */}
                          <AnimatePresence>
                            {dropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl bg-[#0B0B12] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2 backdrop-blur-2xl"
                                role="listbox"
                              >
                                {/* Search Filter Bar */}
                                <div className="relative mb-2 px-1">
                                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                                  <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search services..."
                                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-white placeholder-zinc-500 outline-none focus:border-purple-400/60"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>

                                {/* Options List */}
                                <div className="max-h-52 overflow-y-auto custom-scrollbar flex flex-col gap-0.5">
                                  {filteredServices.length > 0 ? (
                                    filteredServices.map((service) => {
                                      const isSelected = selectedService === service;
                                      return (
                                        <button
                                          key={service}
                                          type="button"
                                          onClick={() => {
                                            setSelectedService(service);
                                            setErrors((prev) => ({ ...prev, service: '' }));
                                            setDropdownOpen(false);
                                            setSearchQuery('');
                                          }}
                                          className={`w-full px-3 py-2 rounded-lg text-xs font-medium text-left flex items-center justify-between transition-colors ${
                                            isSelected
                                              ? 'bg-purple-600/30 text-purple-200 border border-purple-500/30'
                                              : 'text-zinc-300 hover:bg-white/[0.06] hover:text-white'
                                          }`}
                                          role="option"
                                          aria-selected={isSelected}
                                        >
                                          <span>{service}</span>
                                          {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                                        </button>
                                      );
                                    })
                                  ) : (
                                    <div className="px-3 py-3 text-xs text-zinc-500 text-center">
                                      No matching services found
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {touched.service && errors.service && (
                            <span className="text-xs text-rose-400 flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>{errors.service}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Project Details Textarea */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="projectDetails" className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">
                          Project Details <span className="text-zinc-500 font-normal">(Optional)</span>
                        </label>
                        <textarea
                          id="projectDetails"
                          name="projectDetails"
                          rows={4}
                          value={projectDetails}
                          onChange={(e) => setProjectDetails(e.target.value)}
                          placeholder="Tell us about your project, requirements or any specific details..."
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.12] focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 text-sm text-white placeholder-zinc-500 transition-all outline-none resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full mt-2 py-4 rounded-xl text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase text-white bg-[#8B5CF6] hover:bg-[#7C3AED] shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(139,92,246,0.55)] transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            <span>Processing Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Request</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  /* ================= SUCCESS STATE NOTIFICATION CARD ================= */
                  <motion.div
                    key="success-step"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center py-6 sm:py-8"
                  >
                    {/* Glowing Check Icon */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-xl animate-pulse" />
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 relative z-10 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase mb-2">
                      Form Submitted!
                    </h3>
                    <p className="text-emerald-300 text-sm sm:text-base font-semibold mb-4">
                      We will contact you soon.
                    </p>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mb-8">
                      Your request has been prepared and transmitted to our team via WhatsApp. We look forward to discussing your project!
                    </p>

                    {/* Summary Card */}
                    {submittedData && (
                      <div className="w-full p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-left text-xs text-zinc-300 mb-8 flex flex-col gap-2">
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Service</span>
                          <span className="font-semibold text-purple-300">{submittedData.service}</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Client</span>
                          <span className="font-semibold text-white">{submittedData.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Phone</span>
                          <span className="font-mono text-zinc-300">{submittedData.phone}</span>
                        </div>
                      </div>
                    )}

                    {/* Action Button to Submit Another */}
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 transition-all duration-300"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
                      <span>Send Another Request</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

        {/* 
          -------------------------------------------------------------
          BOTTOM BENEFITS STRIP (4 Key Operational Commitments)
          -------------------------------------------------------------
        */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 lg:mt-20 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 backdrop-blur-sm"
        >
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="flex items-start gap-4 lg:px-6 lg:border-r lg:border-white/[0.06] first:lg:pl-0 last:lg:border-r-0 last:lg:pr-0 text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[#A78BFA] shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-[#A78BFA]">
                      {item.number}
                    </span>
                    <h4 className="text-xs sm:text-[13px] font-bold tracking-[0.12em] text-white uppercase">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>

      {/* Animation keyframes */}
      <style>{`
        .animate-ring-beam {
          animation: ringBeamMove 6.5s linear infinite;
        }
        @keyframes ringBeamMove {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -1920;
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.6);
        }
      `}</style>
    </section>
  );
};

export default CTA;

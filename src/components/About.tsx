import React from 'react';
import { motion } from 'framer-motion';

// --- Icons ---
const TargetIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const LightningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ChipIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const RocketIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TeamIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col items-center overflow-hidden bg-[#050507] py-24 sm:py-32 select-none border-t border-white/[0.04]"
      aria-label="Our Founders"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Heading Section */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-[0_0_10px_#8B5CF6]" aria-hidden="true" />
            <span className="text-sm font-semibold tracking-[0.2em] text-[#A78BFA] uppercase">
              OUR FOUNDERS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            The People Behind <span className="text-[#8B5CF6]">MaHris</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            A shared vision. Complementary strengths. One mission—<br className="hidden sm:block" />
            to build digital solutions that drive real impact.
          </motion.p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Mahnoor Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#0A0A0F] border border-white/[0.05] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-8 shadow-2xl"
          >
            {/* Image Side */}
            <div className="w-full sm:w-[40%] flex-shrink-0 relative rounded-2xl overflow-hidden bg-gradient-to-b from-purple-900/10 to-transparent flex items-end justify-center min-h-[300px] sm:min-h-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)] opacity-100 mix-blend-screen" />
              {/* Replace with actual image */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0F] to-transparent z-10" />
              <img src="/images/Mahnoor.png" alt="Mahnoor" className="relative z-0 w-full h-full object-cover object-bottom" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Mahnoor&background=1e1b4b&color=fff&size=512"; e.currentTarget.className="w-full h-full object-cover opacity-50"; }} />
            </div>

            {/* Content Side */}
            <div className="w-full sm:w-[60%] flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Mahnoor</h3>
                <p className="text-[#A78BFA] font-medium mb-6 text-sm sm:text-base">Chief Executive Officer</p>
                
                <p className="text-zinc-400 text-sm sm:text-[15px] leading-relaxed mb-8">
                  Mahnoor leads operations, strategy, and client success at MaHris. With a strong focus on process, people, and performance, she ensures every project is delivered smoothly and creates lasting value for our clients.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                      <TargetIcon className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <span className="text-zinc-300 text-sm sm:text-base">Operations & Process Excellence</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                      <UsersIcon className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <span className="text-zinc-300 text-sm sm:text-base">Client Success & Relationship</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                      <ChartIcon className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <span className="text-zinc-300 text-sm sm:text-base">Strategic Planning</span>
                  </li>
                </ul>
              </div>

              <div>
                <a href="#" className="inline-flex p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors border border-white/[0.05] text-zinc-400 hover:text-white group">
                  <LinkedinIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Haris Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#0A0A0F] border border-white/[0.05] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-8 shadow-2xl"
          >
            {/* Content Side (Left on Desktop for Haris) */}
            <div className="w-full sm:w-[60%] flex flex-col justify-between order-2 sm:order-1">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Haris Khan</h3>
                <p className="text-[#A78BFA] font-medium mb-6 text-sm sm:text-base">Founder</p>
                
                <p className="text-zinc-400 text-sm sm:text-[15px] leading-relaxed mb-8">
                  Haris drives innovation and technology at MaHris. He leads the development of smart digital solutions using AI, automation, and modern technologies to help businesses grow and stay ahead in the digital era.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                      <LightningIcon className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <span className="text-zinc-300 text-sm sm:text-base">Technology & Innovation</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                      <ChipIcon className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <span className="text-zinc-300 text-sm sm:text-base">AI & Automation Solutions</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                      <RocketIcon className="w-5 h-5 text-[#A78BFA]" />
                    </div>
                    <span className="text-zinc-300 text-sm sm:text-base">Product Development</span>
                  </li>
                </ul>
              </div>

              <div>
                <a href="#" className="inline-flex p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors border border-white/[0.05] text-zinc-400 hover:text-white group">
                  <LinkedinIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>

            {/* Image Side (Right on Desktop for Haris) */}
            <div className="w-full sm:w-[40%] flex-shrink-0 relative rounded-2xl overflow-hidden bg-gradient-to-b from-purple-900/10 to-transparent flex items-end justify-center min-h-[300px] sm:min-h-0 order-1 sm:order-2">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_70%)] opacity-100 mix-blend-screen" />
              {/* Replace with actual image */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0F] to-transparent z-10" />
              <img src="/images/Haris.jpeg" alt="Haris Khan" className="relative z-0 w-full h-full object-cover object-bottom" onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Haris+Khan&background=1e1b4b&color=fff&size=512"; e.currentTarget.className="w-full h-full object-cover opacity-50"; }} />
            </div>
          </motion.div>

        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 w-full max-w-4xl mx-auto bg-[#0A0A0F] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/5 via-transparent to-[#8B5CF6]/5 opacity-50" />
          
          <div className="flex-shrink-0 relative z-10">
            <img src="/images/mahris-logo.png" alt="MaHris" className="h-14 w-auto object-contain drop-shadow-2xl" onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100/1e1b4b/FFF?text=M"; }} />
          </div>

          <div className="flex-1 relative z-10">
            <p className="text-zinc-300 text-[15px] sm:text-base text-center sm:text-left leading-relaxed">
              Together, we combine creativity, technology, and strategy to deliver digital experiences that move businesses forward.
            </p>
          </div>

          <div className="flex-shrink-0 relative z-10 text-[#A78BFA] opacity-80 hidden sm:block">
            <TeamIcon className="w-12 h-12 drop-shadow-[0_0_15px_rgba(167,139,250,0.3)]" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;

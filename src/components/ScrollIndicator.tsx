import React from 'react';
import { motion } from 'framer-motion';

export const ScrollIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4 select-none"
      aria-hidden="true"
    >
      {/* Animated Vertical Line */}
      <div className="relative w-[1.5px] h-10 bg-white/15 overflow-hidden rounded-full">
        <div className="absolute left-0 right-0 w-full h-4 bg-gradient-to-b from-purple-400 via-[#8B5CF6] to-transparent rounded-full shadow-[0_0_8px_#8B5CF6] animate-vertical-drop" />
      </div>

      {/* Label */}
      <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-zinc-400/90 uppercase">
        SCROLL TO EXPLORE
      </span>
    </motion.div>
  );
};

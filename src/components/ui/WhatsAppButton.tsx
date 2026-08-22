'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const WHATSAPP_NUMBER = '15551234567';

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={`https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 safe-bottom safe-right z-[10000] group"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.9 }}
    >
      <span className="absolute inset-0 rounded-full bg-[#25d366]/30 animate-ping" />

      <span className="relative flex w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full bg-[#25d366] text-black shadow-lg shadow-[#25d366]/30 transition-transform duration-300 group-hover:scale-110">
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 md:w-7 md:h-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 3C9.383 3 4 8.384 4 15.004c0 2.116.555 4.18 1.607 6.007L4 29l8.176-1.579a11.93 11.93 0 0 0 3.828.64h.004c6.62 0 12.005-5.384 12.005-12.004C28 8.384 22.624 3 16.004 3zm0 21.89h-.002a9.93 9.93 0 0 1-4.663-1.19l-.335-.178-4.853.936.946-4.725-.218-.35a9.91 9.91 0 0 1-1.514-5.28c0-5.508 4.481-9.988 9.99-9.988 5.506 0 9.987 4.48 9.987 9.988 0 5.51-4.481 9.99-9.338 9.99zm5.48-7.485c-.3-.15-1.775-.876-2.05-.976-.275-.1-.476-.15-.676.15-.2.3-.775.976-.95 1.177-.175.2-.35.224-.65.075-.3-.15-1.266-.467-2.411-1.488-.891-.795-1.493-1.777-1.668-2.077-.175-.3-.019-.463.132-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.629-.926-2.231-.244-.586-.491-.506-.676-.516l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.502s1.075 2.902 1.225 3.103c.15.2 2.115 3.23 5.125 4.529.716.31 1.275.494 1.711.633.718.229 1.371.196 1.888.119.576-.086 1.775-.726 2.026-1.427.25-.701.25-1.302.175-1.427-.075-.126-.275-.2-.575-.351z" />
        </svg>
      </span>

      <span
        className={`pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full glass-strong px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs text-foreground/80 transition-all duration-300 hidden md:block ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        Chat with us
      </span>
    </motion.a>
  );
}

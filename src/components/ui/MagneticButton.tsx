'use client';

import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  disabled,
}: MagneticButtonProps) {
  const content = (
    <motion.div
      className={`relative inline-flex items-center justify-center overflow-hidden cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(212,168,83,0.15), transparent 70%)',
        }}
      />
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}

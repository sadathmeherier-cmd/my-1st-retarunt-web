'use client';

import { motion } from 'framer-motion';
import { AnimatedText } from './AnimatedText';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 md:mb-24 ${align === 'center' ? 'text-center' : ''}`}>
      {subtitle && (
        <motion.p
          className="text-gold text-sm tracking-[0.3em] uppercase mb-4 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}
      <AnimatedText
        text={title}
        as="h2"
        className="text-4xl md:text-6xl lg:text-7xl font-display leading-tight"
      />
      <motion.div
        className="mt-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
}

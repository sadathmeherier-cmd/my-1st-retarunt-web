'use client';

import { motion } from 'framer-motion';
import { letterReveal } from '@/lib/animations';

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
}

export function AnimatedText({ text, className, as: Tag = 'h1', delay = 0 }: AnimatedTextProps) {
  const letters = text.split('');

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span className="inline-flex flex-wrap whitespace-nowrap">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={letterReveal}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-50px' }}
            custom={i + delay * 10}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}

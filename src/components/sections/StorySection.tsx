'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-gold/[0.02] to-background" />

      <motion.div className="relative z-10 max-w-5xl mx-auto px-6 text-center" style={{ y, opacity }}>
        <motion.span
          className="text-xs tracking-[0.3em] uppercase text-gold mb-6 block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Philosophy
        </motion.span>

        <motion.p
          className="text-3xl md:text-5xl lg:text-6xl font-display leading-[1.1] text-foreground/80"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Fire is our oldest kitchen tool. At Ember & Oak, we honor its power to
          transform the simplest ingredients into extraordinary experiences.
        </motion.p>

        <motion.div
          className="mt-12 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent max-w-xs mx-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />
      </motion.div>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { RippleButton } from '@/components/ui/RippleButton';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { Particles } from '@/components/ui/Particles';
import { MouseGlow } from '@/components/ui/MouseGlow';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.05), #0a0a0a, #0a0a0a)' }} />

      <MouseGlow />

      <Particles count={50} />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.08), rgba(201,138,58,0.05), transparent)' }} />
          <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ background: 'radial-gradient(circle, rgba(139,32,32,0.05), transparent)', animationDelay: '1s' }} />
        </div>
      </div>

      <div className="relative z-10 text-center px-6 pt-16 md:pt-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-gold/80 mb-6 font-mono border border-gold/20 rounded-full px-4 py-1.5">
            Since 2026
          </span>
        </motion.div>

        <AnimatedText
          text="Where Every Flavor"
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display leading-[0.9] tracking-tight"
        />

        <AnimatedText
          text="Tells a Story"
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display leading-[0.9] tracking-tight mt-2"
          delay={0.5}
        />

        <motion.p
          className="mt-6 text-base md:text-lg text-foreground/50 max-w-2xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Where Fire Meets Flavor. An intimate journey through smoke, spice, and
          the finest ingredients the earth has to offer.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <RippleButton variant="primary" onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}>
            Reserve Table
          </RippleButton>
          <RippleButton variant="outline" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Menu
          </RippleButton>
        </motion.div>
      </div>

      <ScrollIndicator />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />
    </section>
  );
}

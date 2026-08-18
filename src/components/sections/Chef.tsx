'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const timeline = [
  { year: '2010', event: 'Culinary Institute of America — Graduated with Honors' },
  { year: '2012', event: "Le Bernardin, NYC — Line Cook under Eric Ripert" },
  { year: '2014', event: 'Noma, Copenhagen — Stage under René Redzepi' },
  { year: '2016', event: 'Central, Lima — Exploring indigenous ingredients' },
  { year: '2018', event: 'Opened first restaurant — Received first Michelin star' },
  { year: '2024', event: 'Ember & Oak — A new chapter in fine dining' },
];

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 3, suffix: '★', label: 'Michelin Stars' },
  { value: 12, suffix: '', label: 'Awards Won' },
  { value: 50, suffix: '+', label: 'Signature Dishes' },
];

function Counter({ value, suffix = '', label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.span
        className="text-5xl md:text-6xl font-display text-gradient block"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <CountUp start={0} end={value} isInView={isInView} />
        {suffix}
      </motion.span>
      <span className="text-sm text-foreground/50 tracking-widest uppercase mt-2 block">
        {label}
      </span>
    </div>
  );
}

function CountUp({ start, end, isInView, duration = 2 }: { start: number; end: number; isInView: boolean; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      whileInView={{}}
    >
      {end}
    </motion.span>
  );
}

export function ChefSection() {
  return (
    <section id="chef" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-acc/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Our Chef"
          subtitle="Michelin-Starred Visionary"
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="aspect-[3/4] relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
              <div
                className="w-full h-full bg-gradient-to-br from-amber/20 via-warm to-background"
                style={{
                  backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(212,168,83,0.15), transparent 60%), radial-gradient(circle at 70% 60%, rgba(139,32,32,0.1), transparent 40%)',
                }}
              />
              <div className="absolute bottom-8 left-8 right-8">
                <motion.div
                  className="text-4xl md:text-5xl font-display text-gradient"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Chef James<span className="block text-2xl text-foreground/40 font-sans font-light mt-2">Culinary Director</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.p
              className="text-lg text-foreground/60 leading-relaxed mb-8 font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              With a philosophy rooted in the elemental power of flame and the finest seasonal
              ingredients, Chef James has spent over a decade refining his craft in the
              world&apos;s most celebrated kitchens. At Ember & Oak, he brings together his
              passion for smoke, fire, and flavor in an experience that transcends dining.
            </motion.p>

            <motion.div
              className="space-y-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-6 items-start group">
                  <span className="text-gold text-sm font-mono font-bold whitespace-nowrap pt-0.5">
                    {item.year}
                  </span>
                  <div className="flex-1 pb-6 border-b border-glass-border">
                    <p className="text-sm text-foreground/60">{item.event}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {stats.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

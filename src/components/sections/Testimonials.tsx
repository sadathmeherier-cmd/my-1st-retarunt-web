'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useEffect, useRef } from 'react';

const testimonials = [
  { quote: 'An extraordinary culinary journey. Every dish tells a story of fire and passion.', author: 'Sophia Laurent', title: 'Michelin Inspector' },
  { quote: 'Ember & Oak redefines fine dining. The tasting menu is a work of art.', author: 'David Chen', title: 'Food & Wine Magazine' },
  { quote: 'The most unforgettable dining experience of my life. Pure magic.', author: 'Emily Ratajkowski', title: 'Travel + Leisure' },
  { quote: 'Chef James has created something truly special. A symphony of smoke and flavor.', author: 'Marco Pierre White', title: 'Chef & Restaurateur' },
  { quote: 'The ambiance, the service, the food — every detail is impeccable.', author: 'Anna Wintour', title: 'Vogue' },
];

const duplicated = [...testimonials, ...testimonials];

export function TestimonialsSection() {
  const testimonialScrollerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);

  useEffect(() => {
    let animationFrame: number;

    const autoScroll = () => {
      const scroller = testimonialScrollerRef.current;

      if (scroller && !isDragging.current && !scroller.matches(':hover')) {
        scroller.scrollLeft += 0.5;

        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft -= scroller.scrollWidth / 2;
        }
      }

      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section id="testimonials" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-acc/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading title="Testimonials" subtitle="Guest Voices" />

        <div
          ref={testimonialScrollerRef}
          data-lenis-prevent
          className="relative cursor-grab overflow-x-auto mask-edges touch-pan-x select-none active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onPointerDown={(event) => {
            isDragging.current = true;
            dragStartX.current = event.clientX;
            dragStartScrollLeft.current = event.currentTarget.scrollLeft;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!isDragging.current) return;
            event.currentTarget.scrollLeft =
              dragStartScrollLeft.current - (event.clientX - dragStartX.current);
          }}
          onPointerUp={(event) => {
            isDragging.current = false;
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerCancel={() => {
            isDragging.current = false;
          }}
        >
          <motion.div className="flex snap-x snap-mandatory gap-4 sm:gap-6">
            {duplicated.map((t, i) => (
              <div
                key={i}
                className="w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] flex-none snap-start glass rounded-2xl p-6 sm:p-8 hover:gold-glow transition-all duration-300 group"
              >
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-gold/30 mb-3 sm:mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-4 sm:mb-6 font-light italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-[10px] sm:text-xs text-gold/60 tracking-wider uppercase">{t.title}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-24 max-w-5xl mx-auto">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.author}
              className="glass rounded-2xl p-6 sm:p-8 text-center hover:gold-glow transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ perspective: '1000px' }}
            >
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gold/20 transition-colors">
                <svg className="-translate-x-0.5 w-4 sm:w-5 h-4 sm:h-5 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017z" />
                </svg>
              </div>
              <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-4 sm:mb-6 font-light italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-semibold text-foreground">{t.author}</p>
              <p className="text-[10px] sm:text-xs text-gold/60 tracking-wider uppercase mt-1">{t.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

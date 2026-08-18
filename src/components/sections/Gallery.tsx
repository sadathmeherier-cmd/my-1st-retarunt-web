'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const galleryItems = [
  { id: 1, src: '', alt: 'Plated dish with gold leaf', w: 1, h: 1.3, label: 'Wagyu with Gold Leaf' },
  { id: 2, src: '', alt: 'Interior dining room', w: 1.2, h: 1, label: 'The Main Hall' },
  { id: 3, src: '', alt: 'Chef at work', w: 1, h: 1.5, label: 'Behind the Pass' },
  { id: 4, src: '', alt: 'Cocktail being poured', w: 1, h: 1, label: 'Smoked Cocktails' },
  { id: 5, src: '', alt: 'Dessert platter', w: 1.3, h: 1, label: 'Art of Dessert' },
  { id: 6, src: '', alt: 'Wine cellar', w: 1, h: 1.2, label: 'The Cellar' },
  { id: 7, src: '', alt: 'Candlelit table', w: 1, h: 1, label: 'Intimate Dining' },
  { id: 8, src: '', alt: 'Fresh ingredients', w: 1.1, h: 1.1, label: 'From the Earth' },
];

function TiltCard({
  item,
  index,
  onSelect,
}: {
  item: (typeof galleryItems)[0];
  index: number;
  onSelect: (id: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  };

  const spanCols = item.w > 1 ? 'md:col-span-2' : '';
  const spanRows = item.h > 1 ? 'md:row-span-2' : '';
  const aspect = item.h > item.w ? 'aspect-[3/4]' : item.w > item.h ? 'aspect-[4/3]' : 'aspect-square';

  return (
    <motion.div
      ref={cardRef}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl ${spanCols} ${spanRows} ${aspect}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(item.id)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber/10 via-warm to-background group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-sm tracking-widest uppercase text-gold">{item.label}</p>
      </div>
    </motion.div>
  );
}

function Lightbox({ selected, onClose }: { selected: number | null; onClose: () => void }) {
  const item = galleryItems.find((i) => i.id === selected);
  if (!item) return null;

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-4xl w-full aspect-[4/3] rounded-3xl overflow-hidden gold-glow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full bg-gradient-to-br from-amber/20 via-warm to-background" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-2xl font-display text-foreground">{item.label}</p>
            </div>
          </motion.div>
          <button
            className="absolute top-8 right-8 text-foreground/60 hover:text-foreground text-4xl"
            onClick={onClose}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading title="Gallery" subtitle="Visual Journey" />

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto] gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <TiltCard key={item.id} item={item} index={i} onSelect={setSelected} />
          ))}
        </div>
      </div>

      <Lightbox selected={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

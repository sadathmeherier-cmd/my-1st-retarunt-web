'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Cocktails'];

const menuItems = [
  { name: 'Smoked Wagyu Tartare', price: '$32', category: 'Starters', ingredients: 'Prime wagyu, capers, smoked egg yolk, sourdough', description: 'Hand-cut tartare with a delicate hint of hickory smoke' },
  { name: 'Charred Octopus', price: '$28', category: 'Starters', ingredients: 'Spanish octopus, romesco, pickled peppers', description: 'Slow-cooked then charred over oak wood' },
  { name: 'Foie Gras Crème Brûlée', price: '$36', category: 'Starters', ingredients: 'Foie gras, vanilla, caramelized sugar, brioche', description: 'Silky foie gras custard with a caramelized crust' },
  { name: 'Oak-Grilled Ribeye', price: '$68', category: 'Mains', ingredients: 'Dry-aged ribeye, bone marrow butter, roasted shallots', description: '45-day aged prime beef grilled over ember & oak' },
  { name: 'Lobster & Caviar', price: '$82', category: 'Mains', ingredients: 'Maine lobster, oscietra caviar, beurre blanc', description: 'Butter-poached lobster with caviar and champagne sauce' },
  { name: 'Herb-Crusted Lamb Rack', price: '$58', category: 'Mains', ingredients: 'New Zealand lamb, herbs de Provence, rosemary jus', description: 'Lamb crusted with wild herbs and roasted to perfection' },
  { name: 'Smoked Chocolate Lava Cake', price: '$24', category: 'Desserts', ingredients: 'Valrhona chocolate, smoked salt, vanilla ice cream', description: 'Rich molten cake with a whisper of applewood smoke' },
  { name: 'Flambéed Crêpe Suzette', price: '$28', category: 'Desserts', ingredients: 'Grand Marnier, orange zest, caramel, crêpes', description: 'Tableside flambéed crêpes with citrus caramel' },
  { name: 'Cheese & Honey', price: '$22', category: 'Desserts', ingredients: 'Artisan cheeses, truffle honey, candied walnuts', description: 'A curated selection of fine cheeses' },
  { name: 'Ember Old Fashioned', price: '$22', category: 'Cocktails', ingredients: 'Bourbon, smoked maple, bitters, orange', description: 'Classic cocktail with a toasted oak infusion' },
  { name: 'Smoked Rosemary Margarita', price: '$20', category: 'Cocktails', ingredients: 'Tequila, lime, smoked rosemary, agave', description: 'Herbaceous margarita with a smoky finish' },
  { name: 'Midnight Martini', price: '$24', category: 'Cocktails', ingredients: 'Vodka, black truffle, dry vermouth, olive', description: 'An elegant martini with truffle essence' },
];

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const dishScrollerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = dishScrollerRef.current;
    if (!scroller) return;

    isDragging.current = true;
    dragStartX.current = event.clientX;
    dragStartScrollLeft.current = scroller.scrollLeft;
    scroller.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const scroller = dishScrollerRef.current;
    if (!scroller) return;

    scroller.scrollLeft = dragStartScrollLeft.current - (event.clientX - dragStartX.current);
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    isDragging.current = false;
    if (dishScrollerRef.current?.hasPointerCapture(event.pointerId)) {
      dishScrollerRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const scroller = dishScrollerRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;

    const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;

    if (horizontalDelta !== 0) {
      event.preventDefault();
      scroller.scrollLeft += horizontalDelta;
    }
  };

  const filteredItems =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Our Menu"
          subtitle="Crafted by Fire"
        />

        <div className="flex gap-2 overflow-x-auto pb-3 mb-10 md:mb-14 justify-start md:justify-center snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-3 text-[10px] md:text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold text-black font-semibold'
                  : 'bg-glass border border-glass-border text-foreground/60 hover:text-gold hover:border-gold/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-end justify-between gap-4 mb-8 md:mb-10">
              <div>
                <p className="font-mono text-[9px] tracking-[0.28em] uppercase text-gold/70">
                  {activeCategory === 'All' ? 'Tonight at the table' : activeCategory}
                </p>
                <h3 className="mt-2 font-display text-2xl text-foreground md:text-4xl lg:text-5xl">
                  Cooked over fire
                </h3>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/30 sm:block">
                Swipe to explore
              </span>
            </div>

            <div className="mask-edges">
              <div
                ref={dishScrollerRef}
                data-lenis-prevent
                className="flex touch-pan-x cursor-grab snap-x snap-mandatory select-none gap-4 overflow-x-auto pb-8 active:cursor-grabbing md:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
                onPointerLeave={stopDragging}
                onWheel={handleWheel}
              >
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.name}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="group relative min-w-[90%] sm:min-w-[80%] md:min-w-[48%] lg:min-w-[31%] snap-start"
                  >
                    <div className="relative flex min-h-[240px] sm:min-h-[250px] md:min-h-[290px] flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 sm:p-5 md:p-7 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold/30 group-hover:gold-glow">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-gold/60">
                            {item.category}
                          </span>
                          <span className="font-display text-base sm:text-lg text-gradient">
                            {item.price}
                          </span>
                        </div>
                        <h4 className="mt-4 sm:mt-6 font-display text-xl sm:text-2xl leading-tight text-foreground transition-colors duration-300 group-hover:text-gold">
                          {item.name}
                        </h4>
                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-light leading-relaxed text-foreground/45">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-6 border-t border-white/10 pt-3 sm:pt-4">
                        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-gold/60">
                          Ingredients
                        </span>
                        <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-foreground/45">
                          {item.ingredients}
                        </p>
                      </div>
                      <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-b from-gold/0 to-gold/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="h-px w-8 bg-gold" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-foreground/30">
                {filteredItems.length} dishes / drag horizontally
              </span>
              <span className="h-px w-8 bg-gold/30" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

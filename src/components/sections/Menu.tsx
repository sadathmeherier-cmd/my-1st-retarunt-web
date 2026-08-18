'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MagneticButton } from '@/components/ui/MagneticButton';

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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 ${
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative"
                onMouseEnter={() => setHoveredCard(item.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative glass rounded-2xl p-8 h-full transition-all duration-500 group-hover:gold-glow group-hover:-translate-y-2 group-hover:border-gold/20">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-display text-foreground group-hover:text-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="text-lg font-display text-gradient whitespace-nowrap ml-4">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-sm text-foreground/40 mb-4 font-light leading-relaxed">
                    {item.description}
                  </p>

                  <AnimatePresence>
                    {hoveredCard === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-glass-border">
                          <span className="text-xs tracking-[0.2em] uppercase text-gold/60">
                            Ingredients
                          </span>
                          <p className="text-sm text-foreground/50 mt-1">
                            {item.ingredients}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/0 via-gold/0 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

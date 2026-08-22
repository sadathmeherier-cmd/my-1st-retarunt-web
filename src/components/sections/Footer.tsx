'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const socials = [
  { label: 'Instagram', href: '#', color: '#E1306C' },
  { label: 'Facebook', href: '#', color: '#1877F2' },
  { label: 'Twitter', href: '#', color: '#1DA1F2' },
  { label: 'TikTok', href: '#', color: '#000000' },
];

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  Twitter: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
};

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Reservations', href: '#reservation' },
  { label: 'Private Events', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Contact', href: '#' },
];

export function FooterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative py-16 md:py-24 lg:py-32 px-4 md:px-6 overflow-hidden border-t border-glass-border safe-bottom">
      <div className="absolute inset-0 bg-gradient-to-t from-gold/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl md:text-3xl font-display text-gradient tracking-tight block mb-4 md:mb-6">
              Ember & Oak
            </span>
            <p className="text-xs md:text-sm text-foreground/40 leading-relaxed max-w-sm">
              Where Fire Meets Flavor. An intimate dining experience crafted with
              passion, precision, and the finest ingredients.
            </p>
          </motion.div>

<motion.div
            className="flex flex-col sm:flex-row gap-8 sm:gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex-1">
              <h4 className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
                Links
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <h4 className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    style={{ color: social.color }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center border-glass-border hover:scale-110 hover:shadow-lg transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {socialIcons[social.label]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase text-gold mb-4 md:mb-6">
              Newsletter
            </h4>
            <p className="text-xs md:text-sm text-foreground/40 mb-4">
              Subscribe for exclusive events and menu previews.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-glass border border-glass-border rounded-full px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm text-foreground outline-none focus:border-gold/50 transition-colors placeholder:text-foreground/20"
              />
              <button
                type="submit"
                className="px-4 md:px-6 py-2.5 md:py-3 bg-gold text-black text-[10px] md:text-xs tracking-widest uppercase rounded-full font-semibold hover:bg-gold-light transition-colors whitespace-nowrap"
              >
                {subscribed ? '✓ Sent' : 'Join'}
              </button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="pt-6 md:pt-8 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-[10px] md:text-xs text-foreground/30">
            © 2024 Ember & Oak. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 md:gap-4 md:gap-6">
            <a href="#" className="text-[10px] md:text-xs text-foreground/30 hover:text-gold/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[10px] md:text-xs text-foreground/30 hover:text-gold/60 transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

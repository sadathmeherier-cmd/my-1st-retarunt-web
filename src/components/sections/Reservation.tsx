'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RippleButton } from '@/components/ui/RippleButton';

export function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required';
    if (!formData.phone.match(/^[+\d\s()-]{7,}$/)) errs.phone = 'Valid phone required';
    if (!formData.date) errs.date = 'Date required';
    if (!formData.time) errs.time = 'Time required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="reservation" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading title="Reserve a Table" subtitle="Book Your Experience" />

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                className="glass-strong rounded-3xl p-16 text-center gold-glow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <svg className="w-10 h-10 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </motion.div>
                <h3 className="text-3xl font-display text-foreground mb-4">
                  Reservation Confirmed
                </h3>
                <p className="text-foreground/50">
                  We look forward to welcoming you to Ember & Oak.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="glass-strong rounded-3xl p-8 md:p-12 space-y-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Name" error={errors.name}>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full bg-transparent border-b border-glass-border py-3 text-foreground outline-none focus:border-gold transition-colors placeholder:text-foreground/20"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-transparent border-b border-glass-border py-3 text-foreground outline-none focus:border-gold transition-colors placeholder:text-foreground/20"
                      placeholder="your@email.com"
                    />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full bg-transparent border-b border-glass-border py-3 text-foreground outline-none focus:border-gold transition-colors placeholder:text-foreground/20"
                      placeholder="+1 (555) 000-0000"
                    />
                  </Field>
                  <Field label="Guests" error={errors.guests}>
                    <select
                      value={formData.guests}
                      onChange={(e) => handleChange('guests', e.target.value)}
                      className="w-full bg-transparent border-b border-glass-border py-3 text-foreground outline-none focus:border-gold transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n} className="bg-background">
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Date" error={errors.date}>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="w-full bg-transparent border-b border-glass-border py-3 text-foreground outline-none focus:border-gold transition-colors [color-scheme:dark]"
                    />
                  </Field>
                  <Field label="Time" error={errors.time}>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      className="w-full bg-transparent border-b border-glass-border py-3 text-foreground outline-none focus:border-gold transition-colors [color-scheme:dark]"
                    />
                  </Field>
                </div>

                <Field label="Special Requests">
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    className="w-full bg-transparent border-b border-glass-border py-3 text-foreground outline-none focus:border-gold transition-colors resize-none placeholder:text-foreground/20"
                    placeholder="Allergies, celebrations, seating preferences..."
                    rows={2}
                  />
                </Field>

                <div className="pt-4">
                  <RippleButton variant="primary" className="w-full">
                    Confirm Reservation
                  </RippleButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label className="block text-xs tracking-[0.2em] uppercase text-foreground/40 mb-2">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-xs text-red-acc-light mt-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const faqs = [
  {
    question: 'Do you accept reservations?',
    answer: 'Yes. You can reserve a table through our booking form, and our team will confirm your request by email.',
  },
  {
    question: 'What is the dress code?',
    answer: 'We recommend smart casual attire. Jackets are welcome, but never required.',
  },
  {
    question: 'Do you accommodate dietary restrictions?',
    answer: 'Absolutely. Please include allergies or dietary requirements in the special requests field when booking so our kitchen can prepare for your visit.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking two to three weeks ahead for weekends and special occasions. Walk-ins are welcome when space allows.',
  },
  {
    question: 'Do you offer private dining?',
    answer: 'Yes. Private dining and event experiences are available for selected occasions. Contact our team to discuss your requirements.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative px-6 py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeading title="Frequently Asked Questions" subtitle="Good To Know" />

        <div className="border-y border-glass-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="border-b border-glass-border last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-base text-foreground transition-colors hover:text-gold md:py-7 md:text-lg"
                >
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 text-xl font-light text-gold"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-6 pr-14 text-sm font-light leading-relaxed text-foreground/50 md:pb-7 md:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

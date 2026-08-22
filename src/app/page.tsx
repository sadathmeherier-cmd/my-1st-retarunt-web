'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { LoadingScreen } from '@/components/sections/LoadingScreen';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { StorySection } from '@/components/sections/StorySection';
import { MenuSection } from '@/components/sections/Menu';
import { ChefSection } from '@/components/sections/Chef';
import { GallerySection } from '@/components/sections/Gallery';
import { TestimonialsSection } from '@/components/sections/Testimonials';
import { FAQSection } from '@/components/sections/FAQ';
import { ReservationSection } from '@/components/sections/Reservation';
import { FooterSection } from '@/components/sections/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { CursorLight } from '@/components/ui/CursorLight';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <WhatsAppButton />
      <CursorLight />
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      <Navbar />
      <main>
        <Hero />
        <StorySection />
        <MenuSection />
        <ChefSection />
        <GallerySection />
        <TestimonialsSection />
        <FAQSection />
        <ReservationSection />
      </main>
      <FooterSection />
    </>
  );
}

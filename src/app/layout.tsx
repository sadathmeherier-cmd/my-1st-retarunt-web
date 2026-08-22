import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Taste the Extraordinary | Signature Dining & Unforgettable Flavors',
  description:
    'Experience extraordinary flavors, handcrafted dishes, and warm hospitality at a restaurant where every meal becomes a memorable experience.',
  keywords: [
    'signature restaurant & dining experience',
    'unique restaurant experience',
    'signature dishes',
    'premium dining experience',
    'authentic flavors',
    'gourmet restaurant',
    'best dining experience',
    'freshly prepared food',
    'restaurant for special occasions',
    'ember and oak',
  ],
  openGraph: {
    title: 'Taste the Extraordinary | Signature Dining & Unforgettable Flavors',
    description:
      'Experience extraordinary flavors, handcrafted dishes, and warm hospitality at a restaurant where every meal becomes a memorable experience.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="bg-background text-foreground font-sans antialiased noise-overlay safe-area-insets">
        {children}
      </body>
    </html>
  );
}

import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Aureon Design & Build — Designing Inspiring Workspaces',
  description: 'Aureon is a premium Interior Design & Build firm crafting inspiring workspaces, hotels, retail and residential experiences that transform businesses.',
  keywords: 'interior design, design and build, workspace design, corporate interiors, luxury interiors, MEP, general contracting',
  openGraph: {
    title: 'Aureon Design & Build',
    description: 'Designing Inspiring Workspaces That Transform Businesses',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-[#F8F9FA] text-[#222222]">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

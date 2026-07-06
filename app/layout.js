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
  title: 'Raj Furniture | Interior Contractors & Workforce Solutions',
  description: 'Raj Furniture is a leading interior contracting and workforce solutions company delivering commercial, retail, residential, hospital and corporate interior projects across India.',
  keywords: 'interior contractors, workforce providers, commercial interiors, retail fit-outs, office interiors, hospital interiors, hotel interiors, POP works, marble flooring, painting, Mumbai, India',
  openGraph: {
    title: 'Raj Furniture — Interior Contractors & Workforce Solutions',
    description: 'Leading Interior Contractors & Workforce Providers for Commercial, Retail, Residential, Hospitality and Corporate Projects Across India.',
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

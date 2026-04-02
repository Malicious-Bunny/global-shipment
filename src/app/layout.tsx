import type { Metadata } from 'next';
import { Poppins, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Global Express Shipments',
  description: 'Fast, reliable, and secure courier & cargo services worldwide.',
  keywords: 'courier, cargo, shipment, tracking, global express',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
import { getContent } from '@/lib/content';
import { posterSrc } from '@/lib/cloud';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const bc = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-bc', display: 'swap' });
const URL_ = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
export async function generateMetadata() {
  const { site, hero } = await getContent();
  const img = posterSrc(hero.image) || '/hero.jpg';
  return {
    metadataBase: new URL(URL_), title: site.title, description: site.description, keywords: site.keywords.split(',').map((k) => k.trim()).filter(Boolean),
    authors: [{ name: site.name }], alternates: { canonical: '/' },
    openGraph: { title: site.title, description: site.description, url: URL_, siteName: site.name, type: 'website', images: [{ url: img, alt: site.name }] },
    twitter: { card: 'summary_large_image', title: site.title, description: site.description, images: [img] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-video-preview': -1 } },
  };
}
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#0e0c14' };
export default function RootLayout({ children }) {
  return (<html lang="en" className={`${inter.variable} ${bc.variable}`}><body>{children}</body></html>);
}

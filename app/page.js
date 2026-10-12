import { getContent } from '@/lib/content';
import { posterSrc } from '@/lib/cloud';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Work from '@/components/sections/Work';
import Ugc from '@/components/sections/Ugc';
import Provide from '@/components/sections/Provide';
import Services from '@/components/sections/Services';
import Process from '@/components/sections/Process';
import Faq from '@/components/sections/Faq';
import Contact from '@/components/sections/Contact';
export const revalidate = 300;
const URL_ = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
export default async function Home() {
  const c = await getContent();
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'ProfessionalService', name: c.site.name, url: URL_, image: posterSrc(c.hero.image) || URL_ + '/hero.jpg', description: c.site.description, email: c.site.email, sameAs: (c.contact.socials || []).map((x) => x.url).filter(Boolean), ...(c.contact.phone ? { telephone: c.contact.phone } : {}),
      address: { '@type': 'PostalAddress', addressLocality: 'Alexandria', addressCountry: 'EG' }, areaServed: ['Alexandria', 'Egypt', 'Worldwide'], knowsAbout: c.services.items.map((s) => s.title) },
    { '@type': 'FAQPage', mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] };
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <Header c={c} />
    <main id="top"><Hero c={c} /><Stats c={c} /><Work c={c} /><Ugc c={c} /><Provide c={c} /><Services c={c} /><Process c={c} /><Faq c={c} /><Contact c={c} /></main>
    <Footer c={c} />
  </>);
}

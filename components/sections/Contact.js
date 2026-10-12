import ContactForm from '@/components/ui/ContactForm';
import Channels from '@/components/ui/Channels';
import Socials from '@/components/ui/Socials';
import Icon from '@/components/ui/Icon';
export default function Contact({ c }) {
  const k = c.contact, s = c.site, sh = k.show || {};
  return (<section id="contact" className="mx-auto max-w-xl px-4 py-14 text-center">
    <p className="mx-auto flex w-fit items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-[11px] font-extrabold uppercase tracking-wider"><i className="blink h-2 w-2 rounded-full bg-gold" />{k.badge}</p>
    <h2 className="mt-5 font-display text-5xl font-bold uppercase leading-none">{k.title}</h2><p className="mx-auto mt-3 max-w-xs text-sm text-cream/90">{k.sub}</p>
    <div className="text-left">{sh.form !== false
      ? <ContactForm scopes={k.scopes} dial={k.dial || '+20'} flag={k.flag || 'EG'} whatsapp={s.whatsapp} successTitle={k.successTitle} successText={k.successText}><Channels c={c} /></ContactForm>
      : <div className="card mt-6 grid gap-4 rounded-3xl p-5"><Channels c={c} divider={false} /></div>}</div>
    <div className="card mt-5 grid justify-items-center gap-3 rounded-2xl p-4 text-sm font-semibold">
      {sh.location !== false && s.location && <p className="flex items-center gap-2"><Icon n="pin" size={15} className="text-lav" />{s.location}</p>}
      <Socials items={k.socials} showHandle />{k.note && <p className="flex items-center gap-2 text-xs font-bold text-gold"><i className="h-2 w-2 rounded-full bg-gold" />{k.note}</p>}</div></section>);
}

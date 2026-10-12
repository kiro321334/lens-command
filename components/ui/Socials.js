import Icon from '@/components/ui/Icon';
const LABEL = { instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok', youtube: 'YouTube', x: 'X', linkedin: 'LinkedIn', behance: 'Behance', telegram: 'Telegram', snapchat: 'Snapchat', pinterest: 'Pinterest', link: 'Website' };
export default function Socials({ items = [], showHandle = false, className = '' }) {
  const list = items.filter((s) => s.url);
  if (!list.length) return null;
  return (<ul className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>{list.map((s, i) => (
    <li key={i}><a href={s.url} target="_blank" rel="noopener noreferrer me" aria-label={`${LABEL[s.platform] || 'Link'}${s.handle ? ' ' + s.handle : ''}`} className="flex items-center gap-2 rounded-xl border border-line bg-panel2 px-3 py-2 text-sm font-semibold transition hover:border-lav/60">
      <Icon n={s.platform} size={16} className="text-lav" />{showHandle && (s.handle || LABEL[s.platform])}</a></li>))}</ul>);
}

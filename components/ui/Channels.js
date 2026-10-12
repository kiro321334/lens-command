import Icon from "@/components/ui/Icon";
export default function Channels({ c, divider = true }) {
  const k = c.contact,
    s = c.site,
    sh = k.show || {};
  const items = [];
  const wa = (n) =>
    `https://wa.me/${n}?text=${encodeURIComponent(k.whatsappMsg || "")}`;
  if (sh.whatsapp !== false && s.whatsapp)
    items.push([wa(s.whatsapp), k.waLabel1 || "WhatsApp", "chat", true]);
  if (sh.whatsapp !== false && k.whatsapp2)
    items.push([wa(k.whatsapp2), k.waLabel2 || "WhatsApp 2", "chat", true]);
  if (sh.email !== false && s.email)
    items.push([`mailto:${s.email}`, "Email", "mail"]);
  if (sh.call && k.phone)
    items.push([`tel:${k.phone.replace(/[^\d+]/g, "")}`, "Call", "phone"]);
  if (!items.length) return null;
  return (
    <>
      {divider && (
        <p className="mt-1 flex items-center gap-3 text-center text-[11px] text-cream/80">
          <span className="h-px flex-1 bg-line" />
          Instant channels
          <span className="h-px flex-1 bg-line" />
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        {items.map(([href, label, ic, ext]) => (
          <a
            key={href}
            href={href}
            {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="btn-o min-w-[40%] flex-1 gap-2 text-xs"
          >
            <Icon n={ic} size={16} className="text-lav" />
            {label}
          </a>
        ))}
      </div>
    </>
  );
}

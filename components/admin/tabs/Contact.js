"use client";
import {
  Card,
  Input,
  Textarea,
  Select,
  Toggle,
  StringList,
  ListEditor,
} from "@/components/admin/ui";
const PLATFORMS = [
  "instagram",
  "facebook",
  "tiktok",
  "youtube",
  "x",
  "linkedin",
  "behance",
  "telegram",
  "snapchat",
  "pinterest",
  "link",
];
export default function Contact({ c, set }) {
  const k = c.contact,
    s = c.site,
    sh = k.show || {};
  const link = s.whatsapp
    ? `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(k.whatsappMsg || "")}`
    : "";
  return (
    <div className="grid gap-5">
      <Card title="WhatsApp, email & phone">
        <Input
          label="WhatsApp number (digits only, with country code)"
          hint="مثال مصر: 201001234567 — من غير + ولا مسافات"
          value={s.whatsapp}
          onChange={(v) => set("site.whatsapp", v.replace(/\D/g, ""))}
        />
        <Input
          label="WhatsApp button 1 label"
          value={k.waLabel1}
          onChange={(v) => set("contact.waLabel1", v)}
        />
        <Input
          label="Second WhatsApp number (optional)"
          hint="من غير + ولا مسافات، مثال: 201001234567"
          value={k.whatsapp2}
          onChange={(v) => set("contact.whatsapp2", v.replace(/\D/g, ""))}
        />
        <Input
          label="WhatsApp button 2 label"
          value={k.waLabel2}
          onChange={(v) => set("contact.waLabel2", v)}
        />
        <Textarea
          label="Pre-filled WhatsApp message"
          hint="الرسالة اللي بتظهر جاهزة لما الزائر يدوس زرار واتساب"
          value={k.whatsappMsg}
          onChange={(v) => set("contact.whatsappMsg", v)}
          rows={2}
        />
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-lg border border-line px-3 py-2 text-xs font-bold text-lav"
          >
            Test WhatsApp link ↗
          </a>
        )}
        <Input
          label="Email"
          type="email"
          value={s.email}
          onChange={(v) => set("site.email", v)}
        />
        <Input
          label="Phone for calls (optional)"
          hint="مثال: +201001234567"
          value={k.phone}
          onChange={(v) => set("contact.phone", v)}
        />
        <Input
          label="Location"
          value={s.location}
          onChange={(v) => set("site.location", v)}
        />
      </Card>
      <Card title="Social links">
        <p className="text-xs text-mute">
          بتظهر في قسم التواصل وفي الفوتر. اللينك لازم يبدأ بـ https://
        </p>
        <ListEditor
          items={k.socials || []}
          onChange={(v) => set("contact.socials", v)}
          addLabel="Add social link"
          summary={(x) => `${x.platform} — ${x.handle || x.url}`}
          make={() => ({ platform: "instagram", url: "https://", handle: "" })}
          render={(x, u) => (
            <>
              <Select
                label="Platform"
                value={x.platform}
                onChange={(v) => u({ platform: v })}
                options={PLATFORMS}
              />
              <Input
                label="URL"
                value={x.url}
                onChange={(v) => u({ url: v.trim() })}
              />
              <Input
                label="Display name (e.g. @lenscommand)"
                value={x.handle}
                onChange={(v) => u({ handle: v })}
              />
            </>
          )}
        />
      </Card>
      <Card title="Show / hide">
        <Toggle
          label="Contact form"
          value={sh.form !== false}
          onChange={(v) => set("contact.show.form", v)}
        />
        <Toggle
          label="WhatsApp button"
          value={sh.whatsapp !== false}
          onChange={(v) => set("contact.show.whatsapp", v)}
        />
        <Toggle
          label="Email button"
          value={sh.email !== false}
          onChange={(v) => set("contact.show.email", v)}
        />
        <Toggle
          label="Call button (needs phone)"
          value={!!sh.call}
          onChange={(v) => set("contact.show.call", v)}
        />
        <Toggle
          label="Location"
          value={sh.location !== false}
          onChange={(v) => set("contact.show.location", v)}
        />
      </Card>
      <Card title="Contact section text">
        <Input
          label="Badge"
          value={k.badge}
          onChange={(v) => set("contact.badge", v)}
        />
        <Input
          label="Title"
          value={k.title}
          onChange={(v) => set("contact.title", v)}
        />
        <Textarea
          label="Subtitle"
          value={k.sub}
          onChange={(v) => set("contact.sub", v)}
          rows={2}
        />
        <Input
          label="Gold note"
          value={k.note}
          onChange={(v) => set("contact.note", v)}
        />
      </Card>
      <Card title="Form">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Dial code"
            value={k.dial}
            onChange={(v) => set("contact.dial", v)}
          />
          <Input
            label="Country label"
            value={k.flag}
            onChange={(v) => set("contact.flag", v)}
          />
        </div>
        <StringList
          label="Project scope options (dropdown)"
          items={k.scopes}
          onChange={(v) => set("contact.scopes", v)}
        />
        <Input
          label="Success title"
          value={k.successTitle}
          onChange={(v) => set("contact.successTitle", v)}
        />
        <Textarea
          label="Success message"
          value={k.successText}
          onChange={(v) => set("contact.successText", v)}
          rows={2}
        />
      </Card>
    </div>
  );
}

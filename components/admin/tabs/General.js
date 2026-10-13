"use client";
import { Card, Input, Textarea, StringList } from "@/components/admin/ui";
import MediaField from "@/components/admin/MediaField";
export default function General({ c, set }) {
  const s = c.site,
    w = c.work;
  return (
    <div className="grid gap-5">
      <Card title="Site & SEO">
        <MediaField
          label="Logo (Header & Footer)"
          kind="image"
          value={s.logo}
          onChange={(v) =>
            set("site.logo", v || { url: "/logo.png", type: "image" })
          }
          hint="يفضل PNG بخلفية شفافة"
        />
        <Input
          label="Studio name"
          value={s.name}
          onChange={(v) => set("site.name", v)}
        />
        <Input
          label="Footer tagline"
          value={s.tagline}
          onChange={(v) => set("site.tagline", v)}
        />
        <Input
          label="Page title (SEO)"
          hint="مهم لجوجل — يفضل 50-65 حرف"
          value={s.title}
          onChange={(v) => set("site.title", v)}
        />
        <Textarea
          label="Meta description (SEO)"
          hint="مهم لجوجل — يفضل 140-160 حرف"
          value={s.description}
          onChange={(v) => set("site.description", v)}
        />
        <Textarea
          label="Keywords (comma separated)"
          hint="عربي وإنجليزي، افصل بينهم بفاصلة"
          value={s.keywords}
          onChange={(v) => set("site.keywords", v)}
          rows={4}
        />
      </Card>
      <Card title="Work section">
        <Input
          label="Eyebrow"
          value={w.eyebrow}
          onChange={(v) => set("work.eyebrow", v)}
        />
        <Input
          label="Title"
          value={w.title}
          onChange={(v) => set("work.title", v)}
        />
        <Textarea
          label="Subtitle"
          value={w.sub}
          onChange={(v) => set("work.sub", v)}
        />
        <StringList
          label="Filters (first 2 = big buttons, rest = small tags)"
          items={w.filters}
          onChange={(v) => set("work.filters", v)}
        />
        <Input
          label="'View more' button text"
          value={w.moreLabel}
          onChange={(v) => set("work.moreLabel", v)}
        />
      </Card>
    </div>
  );
}

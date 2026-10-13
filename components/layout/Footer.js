import Socials from "@/components/ui/Socials";
export default function Footer({ c }) {
  return (
    <footer className="px-5 pb-12 pt-6 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.site.logo?.url || "/logo.png"}
        alt={`${c.site.name} logo`}
        width={144}
        height={48}
        className="mx-auto h-12 w-auto"
      />
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[.15em] text-cream/80">
        {c.site.tagline}
      </p>
      <p lang="ar" dir="rtl" className="mt-2 text-xs text-mute">
        استوديو تصوير فوتوغرافي وفيديو — الإسكندرية
      </p>
      <Socials items={c.contact.socials} className="mt-5" />
      <a
        href="#top"
        className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-xl bg-panel2 px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider"
      >
        ↑ Back to top
      </a>
      <p className="mt-6 text-[11px] text-mute">
        © {new Date().getFullYear()} {c.site.name}
      </p>
    </footer>
  );
}

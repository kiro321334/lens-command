const nav = [
  ["work", "Work"],
  ["services", "Services"],
  ["studio", "Studio"],
  ["contact", "Contact"],
];
export default function Header({ c }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-[#14121b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <a href="#top" aria-label={`${c.site.name} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.site.logo?.url || "/logo.png"}
            alt={`${c.site.name} logo`}
            width={96}
            height={32}
            className="h-8 w-auto"
          />
        </a>
        <nav
          aria-label="Main"
          className="hidden gap-8 text-sm font-bold uppercase tracking-wider md:flex"
        >
          {nav.map(([id, l]) => (
            <a key={id} href={`#${id}`} className="hover:text-lav">
              {l}
            </a>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary
            aria-label="Menu"
            className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-xl bg-panel2 text-2xl"
          >
            ☰
          </summary>
          <div className="absolute right-0 mt-2 grid w-48 gap-1 rounded-2xl border border-line bg-panel p-2 text-sm font-bold uppercase shadow-xl">
            {nav.map(([id, l]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-xl px-3 py-2.5 hover:bg-panel2"
              >
                {l}
              </a>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}

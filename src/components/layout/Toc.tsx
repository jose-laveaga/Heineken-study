interface TocProps {
  sections: { id: string; label: string }[];
}

const Toc = ({ sections }: TocProps) => (
  <aside className="sticky top-24 hidden h-fit min-w-[180px] rounded-md border border-slate-200 bg-white/90 p-4 text-left text-xs text-slate-500 shadow-sm lg:block">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Contents</p>
    <ul className="mt-3 space-y-2">
      {sections.map((section) => (
        <li key={section.id}>
          <a href={`#${section.id}`} className="hover:text-slate-900">
            {section.label}
          </a>
        </li>
      ))}
    </ul>
  </aside>
);

export default Toc;

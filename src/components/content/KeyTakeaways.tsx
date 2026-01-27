interface KeyTakeaway {
  id: string;
  text: string;
}

interface KeyTakeawaysProps {
  items: KeyTakeaway[];
}

const KeyTakeaways = ({ items }: KeyTakeawaysProps) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item.id} className="flex items-start gap-3 text-sm text-slate-700">
        <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" aria-hidden="true" />
        <span>{item.text}</span>
      </li>
    ))}
  </ul>
);

export default KeyTakeaways;

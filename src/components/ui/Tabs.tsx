import clsx from 'clsx';

export interface TabOption {
  id: string;
  label: string;
}

interface TabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
}

const Tabs = ({ options, value, onChange }: TabsProps) => (
  <div role="tablist" className="flex flex-wrap gap-2">
    {options.map((option) => {
      const isActive = option.id === value;
      return (
        <button
          key={option.id}
          role="tab"
          aria-selected={isActive}
          className={clsx(
            'rounded-full border px-4 py-2 text-sm transition',
            isActive
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
          )}
          onClick={() => onChange(option.id)}
          type="button"
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

export default Tabs;

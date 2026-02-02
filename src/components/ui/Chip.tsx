import clsx from 'clsx';

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const Chip = ({ label, selected = false, onClick }: ChipProps) => (
  <button
    type="button"
    className={clsx(
      'rounded-sm border px-3 py-1 text-xs transition',
      selected
        ? 'border-slate-400 bg-slate-500 text-white'
        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
    )}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Chip;

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
      'rounded-full border px-3 py-1 text-xs transition',
      selected
        ? 'border-slate-900 bg-slate-900 text-white'
        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
    )}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Chip;

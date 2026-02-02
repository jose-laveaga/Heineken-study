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
        ? 'border-[#818f67] bg-[#A3B18A] text-white'
        : 'border-slate-200 bg-white text-slate-600 hover:border-[#818f67]'
    )}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Chip;

import clsx from 'clsx';

interface StatCardProps {
  label: string;
  value: string;
  note?: string;
  className?: string;
}

const StatCard = ({ label, value, note, className }: StatCardProps) => (
  <div className={clsx('rounded-xl border border-slate-200 bg-white p-4 shadow-sm', className)}>
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
    {note ? <p className="mt-1 text-xs text-slate-500">{note}</p> : null}
  </div>
);

export default StatCard;

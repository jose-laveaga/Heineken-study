import { ReactNode } from 'react';
import clsx from 'clsx';

const variantStyles = {
  insight: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  method: 'border-slate-200 bg-slate-100 text-slate-700',
  note: 'border-amber-200 bg-amber-50 text-amber-900'
};

interface CalloutProps {
  variant?: 'insight' | 'method' | 'note';
  title: string;
  children: ReactNode;
}

const Callout = ({ variant = 'insight', title, children }: CalloutProps) => (
  <div className={clsx('rounded-2xl border px-5 py-4 text-sm', variantStyles[variant])}>
    <p className="text-xs font-semibold uppercase tracking-wide">{title}</p>
    <div className="mt-2 text-sm leading-relaxed">{children}</div>
  </div>
);

export default Callout;

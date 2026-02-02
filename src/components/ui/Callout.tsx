import { ReactNode } from 'react';
import clsx from 'clsx';

const variantStyles = {
  insight: 'border-slate-300 bg-slate-50 text-slate-900',
  method: 'border-slate-200 bg-slate-100 text-slate-700',
  note: 'border-slate-200 bg-slate-50 text-slate-700'
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

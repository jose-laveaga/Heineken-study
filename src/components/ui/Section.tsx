import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

const Section = ({ id, title, subtitle, actions, children, className }: SectionProps) => (
  <section id={id} className={clsx('section-anchor space-y-6 py-12', className)}>
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      {actions}
    </div>
    {children}
  </section>
);

export default Section;

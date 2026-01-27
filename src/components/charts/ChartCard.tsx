import { ReactNode, useState } from 'react';
import clsx from 'clsx';

interface StatRow {
  label: string;
  valueText: string;
}

interface ChartCardProps {
  title: string;
  caption?: string;
  footnote?: string;
  interpretation?: string;
  stats?: StatRow[];
  children: ReactNode;
  dataTable?: ReactNode;
}

const ChartCard = ({ title, caption, footnote, interpretation, stats, children, dataTable }: ChartCardProps) => {
  const [showData, setShowData] = useState(false);

  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {caption ? <p className="mt-1 text-xs text-slate-500">{caption}</p> : null}
        </div>
        {dataTable ? (
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-900"
            onClick={() => setShowData((prev) => !prev)}
          >
            {showData ? 'Hide data' : 'View data'}
          </button>
        ) : null}
      </div>
      <div className="min-h-[180px]">{children}</div>
      {interpretation ? <p className="text-sm text-slate-600">{interpretation}</p> : null}
      {stats && stats.length > 0 ? (
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          {stats.map((stat) => (
            <span key={stat.label} className="rounded-full border border-slate-200 px-3 py-1">
              {stat.label}: <span className="text-slate-700">{stat.valueText}</span>
            </span>
          ))}
        </div>
      ) : null}
      {footnote ? <p className="text-xs text-slate-400">{footnote}</p> : null}
      {dataTable ? (
        <div className={clsx('rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600', !showData && 'hidden')}>
          {dataTable}
        </div>
      ) : null}
    </div>
  );
};

export default ChartCard;

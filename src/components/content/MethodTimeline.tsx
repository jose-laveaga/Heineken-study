import { useState } from 'react';

interface Stage {
  id: string;
  title: string;
  description: string;
}

interface MethodTimelineProps {
  stages: Stage[];
}

const MethodTimeline = ({ stages }: MethodTimelineProps) => {
  const [openStages, setOpenStages] = useState<string[]>([]);

  const toggleStage = (stageId: string) => {
    setOpenStages((prev) =>
      prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId]
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-5">
      {stages.map((stage, index) => {
        const isOpen = openStages.includes(stage.id);
        const detailsId = `${stage.id}-details`;

        return (
          <div key={stage.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <button
              type="button"
              onClick={() => toggleStage(stage.id)}
              aria-expanded={isOpen}
              aria-controls={detailsId}
              className="flex w-full flex-col items-start text-left"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">Step {index + 1}</p>
              <h3 className="mt-2 text-sm font-semibold text-slate-900">{stage.title}</h3>
              <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald-600">
                {isOpen ? 'Hide details' : 'View details'}
                <span
                  aria-hidden="true"
                  className={`text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                  ▾
                </span>
              </span>
            </button>
            {isOpen ? (
              <p id={detailsId} className="mt-3 text-xs text-slate-600">
                {stage.description}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default MethodTimeline;

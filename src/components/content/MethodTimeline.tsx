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
  const [activeStageId, setActiveStageId] = useState<string | null>(null);

  const toggleStage = (stageId: string) => {
    setActiveStageId((prev) => (prev === stageId ? null : stageId));
  };

  const activeStage = stages.find((stage) => stage.id === activeStageId);

  return (
    <div className="grid gap-4 md:grid-cols-5">
      {stages.map((stage, index) => {
        const isOpen = activeStageId === stage.id;

        return (
          <div
            key={stage.id}
            className={`rounded-2xl border bg-white p-4 transition ${
              isOpen ? 'border-emerald-300 shadow-sm' : 'border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleStage(stage.id)}
              aria-pressed={isOpen}
              className="flex w-full flex-col items-start text-left"
            >
              <p className="text-xs uppercase tracking-wide text-slate-500">Step {index + 1}</p>
              <h3 className="mt-2 text-sm font-semibold text-slate-900">{stage.title}</h3>
              <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald-600">
                {isOpen ? 'Selected' : 'View details'}
                <span
                  aria-hidden="true"
                  className={`text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}
                >
                  ▾
                </span>
              </span>
            </button>
          </div>
        );
      })}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 md:col-span-5">
        {activeStage ? (
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-700">Step details</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-semibold text-slate-900">{activeStage.title}</h4>
              <span className="text-xs font-semibold text-emerald-700">
                Step {stages.findIndex((stage) => stage.id === activeStage.id) + 1}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-600">{activeStage.description}</p>
            <ul className="mt-3 space-y-1 text-xs text-slate-600">
              <li>• Placeholder detail point one for this step.</li>
              <li>• Placeholder detail point two for this step.</li>
              <li>• Placeholder detail point three for this step.</li>
            </ul>
          </div>
        ) : (
          <p className="text-xs text-slate-600">Select a step to see detailed notes.</p>
        )}
      </div>
    </div>
  );
};

export default MethodTimeline;

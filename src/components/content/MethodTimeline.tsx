interface Stage {
  id: string;
  title: string;
  description: string;
}

interface MethodTimelineProps {
  stages: Stage[];
}

const MethodTimeline = ({ stages }: MethodTimelineProps) => (
  <div className="grid gap-4 md:grid-cols-5">
    {stages.map((stage, index) => (
      <div key={stage.id} className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">Step {index + 1}</p>
        <h3 className="mt-2 text-sm font-semibold text-slate-900">{stage.title}</h3>
        <p className="mt-2 text-xs text-slate-600">{stage.description}</p>
      </div>
    ))}
  </div>
);

export default MethodTimeline;

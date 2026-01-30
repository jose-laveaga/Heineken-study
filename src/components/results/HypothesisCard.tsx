import Card from '../ui/Card';
import { HypothesisOutcome } from '../../data/conclusion';

const outcomeStyles: Record<HypothesisOutcome['outcome'], string> = {
  supported: 'bg-emerald-100 text-emerald-700',
  not_supported: 'bg-rose-100 text-rose-700'
};

interface HypothesisCardProps {
  hypothesis: HypothesisOutcome;
}

const HypothesisCard = ({ hypothesis }: HypothesisCardProps) => (
  <Card className="flex h-full flex-col gap-4">
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{hypothesis.id}</p>
      <h3 className="text-lg font-semibold text-slate-900">{hypothesis.title}</h3>
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Intent</p>
      <p className="mt-2 text-sm text-slate-600">{hypothesis.intent}</p>
    </div>
    <div className="mt-auto space-y-3">
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${outcomeStyles[hypothesis.outcome]}`}
        >
          {hypothesis.outcomeLabel}
        </span>
      </div>
      <p className="text-sm text-slate-600">{hypothesis.supportingText}</p>
    </div>
  </Card>
);

export default HypothesisCard;

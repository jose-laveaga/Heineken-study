import Card from '../ui/Card';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import { HypothesisOutcome } from '../../data/conclusion';

const outcomeChipStyles: Record<HypothesisOutcome['outcome'], string> = {
  supported: 'bg-slate-100 text-slate-700',
  not_supported: 'bg-slate-50 text-slate-600'
};

interface HypothesisOutcomeChartProps {
  hypotheses: HypothesisOutcome[];
  keyTakeaway: string;
}

const HypothesisOutcomeChart = ({ hypotheses, keyTakeaway }: HypothesisOutcomeChartProps) => {
  const chartData = hypotheses.map((hypothesis) => ({
    label: hypothesis.id,
    value: hypothesis.evidenceStrength
  }));

  return (
    <Card className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hypothesis outcomes</p>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">Evidence strength by hypothesis</h3>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px]">
        <HorizontalBarChart
          data={chartData}
          ariaLabel="Evidence strength by hypothesis"
          valueSuffix=""
        />
        <div className="space-y-4 text-sm text-slate-600">
          {hypotheses.map((hypothesis) => (
            <div key={hypothesis.id} className="flex items-center justify-between gap-2">
              <span className="text-slate-500">{hypothesis.id}</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  outcomeChipStyles[hypothesis.outcome]
                }`}
              >
                {hypothesis.outcomeLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Evidence strength is a normalized summary based on reported statistical significance patterns (not raw p-values).
      </p>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
        Key takeaway: {keyTakeaway}
      </div>
    </Card>
  );
};

export default HypothesisOutcomeChart;

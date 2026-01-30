import Card from '../ui/Card';
import ChartCard from '../charts/ChartCard';
import GroupedBarChart from '../charts/GroupedBarChart';
import DonutChart from '../charts/DonutChart';
import InterpretationCallout from './InterpretationCallout';
import type { DiscrepancyCase, LikelihoodChart, ChoiceChart } from '../../data/discrepancies';

interface DiscrepancyCaseCardProps {
  caseItem: DiscrepancyCase;
}

const likelihoodFootnote = '1 = Very unlikely, 5 = Very likely';

const getLikelihoodData = (chart: LikelihoodChart) =>
  chart.distribution.map((entry) => ({
    label: String(entry.score),
    pct: entry.pct
  }));

const getChoiceData = (chart: ChoiceChart) =>
  chart.shares.map((entry) => ({
    label: entry.label,
    value: entry.pct
  }));

const DiscrepancyCaseCard = ({ caseItem }: DiscrepancyCaseCardProps) => {
  const likelihoodLookup = Object.fromEntries(
    caseItem.likelihoodCharts.map((chart) => [chart.figureId, chart])
  ) as Record<string, LikelihoodChart>;
  const choiceLookup = Object.fromEntries(
    caseItem.choiceCharts.map((chart) => [chart.figureId, chart])
  ) as Record<string, ChoiceChart>;

  return (
    <Card className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900">{caseItem.title}</h3>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          {caseItem.narrative.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-slate-600">
              {paragraph}
            </p>
          ))}
          <InterpretationCallout takeaway={caseItem.takeaway} />
        </div>
        <div className="grid gap-4">
          {caseItem.figures.map((figure) => {
            if (figure.kind === 'likelihood') {
              const chart = likelihoodLookup[figure.id];
              if (!chart) {
                return null;
              }
              return (
                <ChartCard
                  key={figure.id}
                  title={figure.caption}
                  footnote={likelihoodFootnote}
                >
                  <GroupedBarChart
                    data={getLikelihoodData(chart)}
                    series={[{ key: 'pct', label: chart.brandLabel }]}
                    ariaLabel={`${chart.brandLabel} purchase likelihood distribution`}
                  />
                </ChartCard>
              );
            }

            const chart = choiceLookup[figure.id];
            if (!chart) {
              return null;
            }

            return (
              <ChartCard key={figure.id} title={figure.caption}>
                <DonutChart data={getChoiceData(chart)} ariaLabel={`${figure.caption} donut chart`} />
              </ChartCard>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default DiscrepancyCaseCard;

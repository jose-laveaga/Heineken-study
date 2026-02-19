import { useState } from 'react';
import Card from '../ui/Card';
import ChartCard from '../charts/ChartCard';
import GroupedBarChart from '../charts/GroupedBarChart';
import DonutChart from '../charts/DonutChart';
import type { DiscrepancyCase, LikelihoodChart, ChoiceChart } from '../../data/discrepancies';
import { PARTICIPANT_SAMPLE_SIZE, toShareFromPercent } from '../../utils/participantMetrics';

interface DiscrepancyCaseCardProps {
  caseItem: DiscrepancyCase;
}

const likelihoodFootnote = '1 = Very unlikely, 5 = Very likely';

const getLikelihoodData = (chart: LikelihoodChart) =>
  chart.distribution.map((entry) => {
    const share = toShareFromPercent(entry.pct, PARTICIPANT_SAMPLE_SIZE);
    return {
      label: String(entry.score),
      share,
      percent: entry.pct
    };
  });

const getChoiceData = (chart: ChoiceChart) =>
  chart.shares.map((entry) => {
    const share = toShareFromPercent(entry.pct, PARTICIPANT_SAMPLE_SIZE);
    return {
      label: entry.label,
      share,
      percent: entry.pct,
      value: share
    };
  });

const DiscrepancyCaseCard = ({ caseItem }: DiscrepancyCaseCardProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const likelihoodLookup = Object.fromEntries(
    caseItem.likelihoodCharts.map((chart) => [chart.figureId, chart])
  ) as Record<string, LikelihoodChart>;
  const choiceLookup = Object.fromEntries(
    caseItem.choiceCharts.map((chart) => [chart.figureId, chart])
  ) as Record<string, ChoiceChart>;

  return (
    <Card className="space-y-6">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-slate-900">{caseItem.title}</h3>
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {isOpen ? 'Hide details' : 'View details'}
        </span>
      </button>
      {isOpen ? (
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            {caseItem.narrative.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
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
                      series={[
                        {
                          key: 'share',
                          label: chart.brandLabel,
                          color: chart.brandLabel === 'Rescue Club N.A.' ? '#5c6f82' : undefined
                        }
                      ]}
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
      ) : null}
    </Card>
  );
};

export default DiscrepancyCaseCard;

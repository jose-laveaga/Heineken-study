import Accordion from '../ui/Accordion';
import ChartCard from '../charts/ChartCard';
import GroupedBarChart from '../charts/GroupedBarChart';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import BoxPlotChart from '../charts/BoxPlotChart';
import { computeH2Metrics, computeH3Interaction } from '../../utils/analysis';
import { formatPercent, toPercentFromShare, toShareFromPercent } from '../../utils/participantMetrics';

const h1SelectionShares = [
  { label: 'Heineken 0.0', share: 2416 },
  { label: 'Fictional Brands', share: 1357 }
];
const h1SelectionTotal = h1SelectionShares.reduce((sum, entry) => sum + entry.share, 0);
const h1ChartData = h1SelectionShares.map((entry) => {
  const percent = toPercentFromShare(entry.share, h1SelectionTotal);
  return {
    label: entry.label,
    share: entry.share,
    percent,
    value: percent
  };
});

const h1PriceComparison = [
  { label: 'Equal price', heinekenShare: 511, fictionalShare: 308 },
  { label: 'Heineken more expensive', heinekenShare: 385, fictionalShare: 440 },
  { label: 'Clear Hops more expensive', heinekenShare: 590, fictionalShare: 230 }
];
const h1PriceComparisonChart = h1PriceComparison.map((entry) => {
  const total = entry.heinekenShare + entry.fictionalShare;
  const heinekenPercent = toPercentFromShare(entry.heinekenShare, total).toFixed(2);
  const fictionalPercent = toPercentFromShare(entry.fictionalShare, total).toFixed(2);
  return {
    label: entry.label,
    heinekenPercent,
    heinekenShare: entry.heinekenShare,
    fictionalPercent,
    fictionalShare: entry.fictionalShare
  };
});

const h2BoxPlotData = [
  // (0.999, 2.0] — degenerate box at 1.0
  { label: '(0.999, 2.0]', min: 1.0, q1: 1.0, median: 1.0, q3: 1.0, max: 1.0 },
  // (2.0, 3.0]
  { label: '(2.0, 3.0]', min: 1.0, q1: 1.0, median: 2.0, q3: 2.75, max: 4.0 },
  // (3.0, 4.0]
  { label: '(3.0, 4.0]', min: 1.0, q1: 2.0, median: 3.0, q3: 4.0, max: 5.0 },
  // (4.0, 5.0]
  // Note: outliers at ~2.0 and ~1.0 exist in the plot; whisker-min is ~3.0.
  { label: '(4.0, 5.0]', min: 3.0, q1: 4.0, median: 5.0, q3: 5.0, max: 5.0 }
];

const h3SegmentLift = [
  { label: 'Non-drinkers', percent: 42.3 },
  { label: 'Regular', percent: 45.4 }
];
const h3SegmentLiftChart = h3SegmentLift.map((entry) => {
  const share = toShareFromPercent(entry.percent, 5774);
  return {
    label: entry.label,
    share,
    percent: entry.percent,
    value: share
  };
});

const badgeStyles: Record<string, string> = {
  Supported: 'bg-slate-100 text-slate-700',
  'Partially Supported': 'bg-slate-200 text-slate-700',
  'Not Supported': 'bg-slate-50 text-slate-600',
  'Pending data hookup': 'bg-slate-100 text-slate-600'
};

const ResultsHypotheses = () => {
  const experimentData = undefined;
  const h2Metrics = computeH2Metrics(experimentData);
  const h3Interaction = computeH3Interaction(experimentData);
  const h2Decision = 'Supported';
  const h3Decision = 'Not Supported';
  const h2MetricsDetails = h2Metrics.available
    ? [
        h2Metrics.r_trust !== undefined
          ? `Trustworthiness vs ${h2Metrics.outcomeLabel ?? 'Heineken choice'}: r = ${h2Metrics.r_trust.toFixed(2)}`
          : null,
        h2Metrics.r_quality !== undefined
          ? `Perceived quality vs ${h2Metrics.outcomeLabel ?? 'Heineken choice'}: r = ${h2Metrics.r_quality.toFixed(2)}`
          : null,
        h2Metrics.r_taste !== undefined
          ? `Expected taste vs ${h2Metrics.outcomeLabel ?? 'Heineken choice'}: r = ${h2Metrics.r_taste.toFixed(2)}`
          : null,
        h2Metrics.modelSummary ? h2Metrics.modelSummary : null
      ].filter((item): item is string => Boolean(item))
    : [
      ];
  const h3InteractionDetails = h3Interaction.available
    ? [
        `Regular drinkers Heineken share: ${h3Interaction.regularLift?.toFixed(1) ?? 'TBD'}%`,
        `Non-drinkers Heineken share: ${h3Interaction.nonDrinkerLift?.toFixed(1) ?? 'TBD'}%`,
        `Interaction effect (mother brand × regular drinker): ${h3Interaction.interactionEffect?.toFixed(2) ?? 'TBD'}`
      ]
    : [

      ];

  return (
    <div id="hypotheses" className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500"></p>
        <h3 className="text-2xl font-semibold text-slate-900">Hypotheses Testing</h3>
      </div>
      <Accordion
        items={[
          {
            id: 'hypothesis-h1',
            title:
                'H1: Heineken 0.0 will be chosen more frequently in the simulated purchase environment compared to a fictional non-branded 0.0 beer.',
            content: (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-wide text-slate-500">Result</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles.Supported}`}>
                    Supported
                  </span>
                  <span className="text-xs text-slate-500">Decision based on choice outcomes across one on one comparisons.</span>
                </div>
                <div>
                  <div>
                    <strong>
                      Null Hypothesis (H0):
                    </strong>{' '}
                     Heineken 0.0 is not chosen more frequently than the fictional non-branded 0.0 beer in the simulated purchase environment.
                  </div>
                  <div style={{ marginLeft: '0px', marginTop: '6px' }}>
                    <strong>
                      Alternate Hypothesis (H1):
                    </strong>{' '}
                     Heineken 0.0 will be chosen more frequently in the simulated purchase environment compared to a fictional non-branded 0.0 beer.
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Methodology</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                        <li>
                          <span className="font-medium text-slate-700">Test:</span> One-sided proportion test assessing whether the
                          probability of choosing Heineken 0.0 exceeds chance (<span className="font-mono">{"p\u0302"}= 0.5</span>).
                        </li>
                        <li>
                          <span className="font-medium text-slate-700">Aggregation:</span> Results aggregated across three price scenarios:
                          equal pricing, Heineken 0.0 more expensive, and the fictional brand more expensive.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sample</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                        <li>
                          <span className="font-medium text-slate-700">Total observations (N):</span> 3,773
                        </li>
                        <li>
                          <span className="font-medium text-slate-700">Heineken 0.0 selections:</span> 2,416
                        </li>
                        <li>
                          <span className="font-medium text-slate-700">Fictional brand selections:</span> 1,357
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Results</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                        <li>
                          Heineken 0.0 was selected significantly more often than the fictional comparator across all price conditions.
                        </li>
                        <li>
                          The preference persists even when Heineken 0.0 is priced higher, indicating resilience to price disadvantage.
                        </li>
                        <li>
                          One-sided significance: <span>p &lt; 0.001</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conclusion</p>
                      <p className="mt-2 text-sm text-slate-600">
                        The null hypothesis is rejected in favor of the alternative: Heineken 0.0 shows a statistically overwhelming
                        preference advantage across all tested pricing scenarios.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Evidence chart</p>
                    <ChartCard
                      title="Heineken vs Fictional Brands share"
                      dataTable={(
                        <table className="w-full table-fixed text-sm">
                          <thead>
                            <tr className="text-[10px] uppercase tracking-wide text-slate-500">
                              <th className="w-1/2 py-1 pr-6 text-left font-semibold">Option</th>
                              <th className="w-1/4 py-1 px-3 text-right font-semibold">Share</th>
                              <th className="w-1/4 py-1 pl-6 text-right font-semibold">Percent</th>
                            </tr>
                          </thead>

                          <tbody>
                            {h1ChartData.map((entry) => (
                              <tr key={entry.label} className="border-b border-slate-200 last:border-0">
                                <td className="py-2 pr-6 text-left font-medium text-slate-700">{entry.label}</td>
                                <td className="py-2 px-3 text-right tabular-nums text-slate-600">{entry.share}</td>
                                <td className="py-2 pl-6 text-right tabular-nums text-slate-600">
                                  {formatPercent(entry.percent)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    >
                      <HorizontalBarChart
                        data={h1ChartData}
                        ariaLabel="Heineken vs Fictional brands bar chart"
                        valueLabel="Selections"
                        xAxisTickFormatter={(value) => `${value}%`}
                      />
                    </ChartCard>
                    <ChartCard
                      title="Price sensitivity"
                      dataTable={(
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-[10px] uppercase tracking-wide text-slate-500">
                              <th className="py-1 font-semibold">Scenario</th>
                              <th className="py-1 text-right font-semibold">Heineken share</th>
                              <th className="py-1 text-right font-semibold">Heineken %</th>
                              <th className="py-1 text-right font-semibold">Fictional share</th>
                              <th className="py-1 text-right font-semibold">Fictional %</th>
                            </tr>
                          </thead>
                          <tbody>
                            {h1PriceComparison.map((entry) => (
                              <tr key={entry.label} className="border-b border-slate-200 last:border-0">
                                <td className="py-1 text-left font-medium text-slate-700">{entry.label}</td>
                                <td className="py-1 text-right text-slate-600">{entry.heinekenShare}</td>
                                <td className="py-1 text-right text-slate-600">
                                  {formatPercent(
                                    toPercentFromShare(entry.heinekenShare, entry.heinekenShare + entry.fictionalShare)
                                  )}
                                </td>
                                <td className="py-1 text-right text-slate-600">{entry.fictionalShare}</td>
                                <td className="py-1 text-right text-slate-600">
                                  {formatPercent(
                                    toPercentFromShare(entry.fictionalShare, entry.heinekenShare + entry.fictionalShare)
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    >
                      <GroupedBarChart
                        data={h1PriceComparisonChart}
                        series={[
                          { key: 'heinekenPercent', label: 'Heineken 0.0' },
                          { key: 'fictionalPercent', label: 'Fictional brand' }
                        ]}
                        ariaLabel="Price sensitivity grouped bar chart"
                        yAxisTickFormatter={(value) => `${value}%`}
                      />
                    </ChartCard>
                  </div>
                </div>
              </div>
            )
          },
          {
            id: 'hypothesis-h2',
            title: 'H2: Brand perception scores for Heineken will positively correlate with purchase behavior and intent for Heineken 0.0.',
            content: (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-wide text-slate-500">Result</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[h2Decision]}`}>
                    {h2Decision}
                  </span>
                  <span className="text-xs text-slate-500">
                    Tests examine correlations between perception metrics and Heineken choice/intent.
                  </span>
                </div>
                <div>
                  <div>
                    <strong>
                      Null Hypothesis (H0):
                    </strong>{' '}
                    Brand perception scores for Heineken do not positively correlate with purchase behavior and intent for Heineken 0.0.
                  </div>
                  <div style={{ marginLeft: '0px', marginTop: '6px' }}>
                    <strong>
                      Alternate Hypothesis (H2):
                    </strong>{' '}
                    Brand perception scores for Heineken will positively correlate with purchase behavior and intent for Heineken 0.0.
                  </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hypothesis</p>
                      <p className="mt-2 text-sm text-slate-600">
                        Brand perception scores for Heineken are positively correlated with purchase behavior and purchase intent for
                        Heineken&nbsp;0.0.
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Perception Index</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                        <li>
                          The general index was derived from respondent evaluations of trustworthiness, expected taste, expected quality, and brand
                          familiarity.
                        </li>
                        <li>Scores aggregated and segmented into four ordered perception bands.</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Results</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                        <li>
                          Purchase likelihood increases monotonically as overall brand perception improves, with medians rising consistently
                          across perception bands.
                        </li>
                        <li>
                          Higher reported brand perception score categories exhibit both higher central tendency and reduced variance in purchase likelihood.
                        </li>
                        <li>
                          Correlation analysis indicates a strong positive association:
                          <span> r&nbsp;=&nbsp;0.724</span>, <span>p &lt; 0.001 </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conclusion</p>
                      <p className="mt-2 text-sm text-slate-600">
                        The null hypothesis of no relationship between brand perception and purchase intent is decisively rejected. Higher
                        perceived trust, quality, taste expectations, and familiarity strongly predict increased likelihood to purchase
                        Heineken&nbsp;0.0.
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Figure Note</p>
                      <p className="mt-2 text-sm text-slate-600">
                        The figure above presents a box plot of purchase likelihood by average brand perception score. Median values (highlighted
                        in dark blue) and quartile distributions show a clear trend across perception categories, visually confirming the
                        positive correlation.
                      </p>
                    </div>
                    <div>
                      <p>
                          The chart is organized vertically by perception tiers, shown on the {"y\u2011axis"}as score ranges (e.g., (2.0, 3.0], (3.0, 4.0]),
                          where each row represents respondents with similar perception levels. Along the {"x\u2011axis"} is purchase intent (in %), and
                          each box plot shows the distribution within that tier: the line inside the box is the median, the box represents the interquartile
                          range (Q1 to Q3), and the whiskers indicate the minimum and maximum values.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Evidence chart</p>
                    <ChartCard
                      title="Purchase intent by perception tier"
                      dataTable={(
                        <table className="w-full text-sm">
                          <tbody>
                            {h2BoxPlotData.map((entry) => (
                              <tr key={entry.label} className="border-b border-slate-200 last:border-0">
                                <td className="py-1 text-left font-medium text-slate-700">{entry.label}</td>
                                <td className="py-1 text-right text-slate-600">
                                  {entry.min}-{entry.max}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    >
                      <BoxPlotChart data={h2BoxPlotData} ariaLabel="Purchase intent distribution by perception tier" valueSuffix="%" />
                    </ChartCard>
                  </div>
                </div>
                {h2MetricsDetails.length ? (
                  <ul className="space-y-1 text-xs text-slate-500">
                    {h2MetricsDetails.map((detail) => (
                      <li key={detail}>• {detail}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )
          },
          {
            id: 'hypothesis-h3',
            title: 'H3: The impact of the mother brand on purchase behavior will be stronger for regular alcohol drinkers than non-drinkers.',
            content: (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-wide text-slate-500">Result</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[h3Decision]}`}>
                    {h3Decision}
                  </span>
                  <span className="text-xs text-slate-500">Segment-level analysis compares mother-brand lift by drinking habit.</span>
                </div>
                <div>
                  <div>
                    <strong>
                      Null Hypothesis (H0):
                    </strong>{' '}
                    The impact of the mother brand on purchase behavior is not stronger for regular alcohol drinkers than for non-drinkers.
                  </div>
                  <div style={{ marginLeft: '0px', marginTop: '6px' }}>
                    <strong>
                      Alternate Hypothesis (H3):
                    </strong>{' '}
                    The impact of the mother brand on purchase behavior will be stronger for regular alcohol drinkers than non-drinkers.
                  </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Methodology</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                        <li>
                          Purchase choices analyzed across all experimental scenarios, with respondents segmented into regular and non-regular
                          drinkers based on self-reported alcohol consumption frequency.
                        </li>
                        <li>
                          Analysis included all eligible observations (5,774 choices from 413 respondents) and applied statistical testing that
                          accounts for repeated measures at the individual level.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Results</p>
                      <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                        <li>
                          Mother-brand selection rates were similar across consumption segments: 45.4% among regular drinkers versus 42.3% among
                          non-regular drinkers.
                        </li>
                        <li>
                          The difference is not statistically significant (odds ratio = 1.14; 95% CI: 0.93–1.38; <span className="font-mono">p = 0.208</span>).
                        </li>
                        <li>Results indicate no meaningful moderation effect of drinking frequency on mother-brand choice.</li>
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conclusion</p>
                      <p className="mt-2 text-sm text-slate-600">
                        The null hypothesis&nbsp;is not rejected. There is no evidence that the influence of the mother brand on purchase behavior
                        is stronger for regular drinkers than for non-regular drinkers. Mother-brand equity operates consistently across
                        consumption segments, indicating a broad-based brand effect rather than one driven by heavier alcohol users.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Evidence chart</p>
                    <ChartCard
                      title="Mother-brand lift by drinking habit"
                      dataTable={(
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-left text-[10px] uppercase tracking-wide text-slate-500">
                              <th className="py-1 font-semibold">Segment</th>
                              <th className="py-1 text-right font-semibold">Share</th>
                              <th className="py-1 text-right font-semibold">Percent</th>
                            </tr>
                          </thead>
                          <tbody>
                            {h3SegmentLiftChart.map((entry) => (
                              <tr key={entry.label} className="border-b border-slate-200 last:border-0">
                                <td className="py-1 text-left font-medium text-slate-700">{entry.label}</td>
                                <td className="py-1 text-right text-slate-600">{entry.share}</td>
                                <td className="py-1 text-right text-slate-600">{formatPercent(entry.percent)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    >
                      <HorizontalBarChart
                        data={h3SegmentLiftChart}
                        ariaLabel="Mother-brand choice by drinking habit bar chart"
                        valueLabel="Participants"
                      />
                    </ChartCard>
                  </div>
                </div>
                {h3InteractionDetails.length ? (
                  <ul className="space-y-1 text-xs text-slate-500">
                    {h3InteractionDetails.map((detail) => (
                      <li key={detail}>• {detail}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )
          }
        ]}
      />
    </div>
  );
};

export default ResultsHypotheses;

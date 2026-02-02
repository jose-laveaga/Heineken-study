import { useMemo, useState } from 'react';
import Tabs from '../ui/Tabs';
import Chip from '../ui/Chip';
import Accordion from '../ui/Accordion';
import ChartCard from '../charts/ChartCard';
import DonutChart from '../charts/DonutChart';
import GroupedBarChart from '../charts/GroupedBarChart';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import BoxPlotChart from '../charts/BoxPlotChart';
import resultsComparisons from '../../data/resultsComparisons.json';
import { computeH2Metrics, computeH3Interaction, segmentByDrinkingHabit } from '../../utils/analysis';

const categoryTabs = [
  { id: '1v1_nonpriced', label: '1v1 (No Price)' },
  { id: '1v1_priced', label: '1v1 (Price)' },
  { id: 'multi_brand', label: 'Multi-Brand' }
];

const formatLabels: Record<string, string> = {
  can: 'Can',
  '12-pack': '12-pack'
};

const scenarioLabels: Record<string, string> = {
  equal_price: 'Equal price',
  heineken_cheaper: 'Heineken cheaper',
  fictional_brand_cheaper: 'Fictional brand cheaper'
};

const categoryFilters = {
  '1v1_nonpriced': {
    brands: ['Heineken 0.0', 'Budweiser Zero', 'Star Brew Non-Alcoholic', 'Rescue Club Non-Alcoholic', "O'Doul's No-Alc"],
    formats: [],
    scenarios: []
  },
  '1v1_priced': {
    brands: [],
    formats: ['12-pack', 'can'],
    scenarios: ['equal_price', 'heineken_cheaper', 'fictional_brand_cheaper']
  },
  'multi_brand': {
    brands: [],
    formats: [],
    scenarios: []
  }
} as const;

const h1ChartData = [
  { label: 'Heineken 0.0', value: 2416 },
  { label: 'Fictional Brands', value: 1357 }
];

const h1PriceComparison = [
  { label: 'Equal price', heineken: 511, fictional: 308 },
  { label: 'Heineken more expensive', heineken: 385, fictional: 440 },
  { label: 'Clear Hops more expensive', heineken: 590, fictional: 230 }
];

const h2BoxPlotData = [
    // (0.999, 2.0] — degenerate box at 1.0
    { label: "(0.999, 2.0]", min: 1.0, q1: 1.0, median: 1.0, q3: 1.0, max: 1.0 },

    // (2.0, 3.0]
    { label: "(2.0, 3.0]", min: 1.0, q1: 1.0, median: 2.0, q3: 2.75, max: 4.0 },

    // (3.0, 4.0]
    { label: "(3.0, 4.0]", min: 1.0, q1: 2.0, median: 3.0, q3: 4.0, max: 5.0 },

    // (4.0, 5.0]
    // Note: outliers at ~2.0 and ~1.0 exist in the plot; whisker-min is ~3.0.
    { label: "(4.0, 5.0]", min: 3.0, q1: 4.0, median: 5.0, q3: 5.0, max: 5.0 },
];


const h3SegmentLift = [
  { label: 'Non-drinkers', value: 42.3 },
  { label: 'Regular', value: 45.4 }
];

const badgeStyles: Record<string, string> = {
  Supported: 'bg-slate-100 text-slate-700',
  'Partially Supported': 'bg-slate-200 text-slate-700',
  'Not Supported': 'bg-slate-50 text-slate-600',
  'Pending data hookup': 'bg-slate-100 text-slate-600'
};

const ResultsExplorer = () => {
  // TODO: Replace placeholder values in /src/data/resultsComparisons.json with final study numbers.
  const [category, setCategory] = useState('1v1_nonpriced');
  const [brandFilter, setBrandFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [scenarioFilter, setScenarioFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const comparisons = resultsComparisons.comparisons;
  const experimentData = undefined;
  const h2Metrics = computeH2Metrics(experimentData);
  const h3Segments = segmentByDrinkingHabit(experimentData);
  const h3Interaction = computeH3Interaction(experimentData);
  const h2Decision = 'Supported';
  const h3Decision = 'Not Supported';
    h2Metrics.available
        ? [
            h2Metrics.r_trust !== undefined
                ? `Trustworthiness vs ${h2Metrics.outcomeLabel ?? 'Heineken choice'}: r = ${h2Metrics.r_trust.toFixed(
                    2
                )}`
                : null,
            h2Metrics.r_quality !== undefined
                ? `Perceived quality vs ${h2Metrics.outcomeLabel ?? 'Heineken choice'}: r = ${h2Metrics.r_quality.toFixed(
                    2
                )}`
                : null,
            h2Metrics.r_taste !== undefined
                ? `Expected taste vs ${h2Metrics.outcomeLabel ?? 'Heineken choice'}: r = ${h2Metrics.r_taste.toFixed(2)}`
                : null,
            h2Metrics.modelSummary ? h2Metrics.modelSummary : null
        ].filter((item): item is string => Boolean(item))
        : [
            'Pending / Needs Data Hookup — connect perception metrics (trustworthiness, quality, taste) to Heineken choice or likelihood.',
            'TODO: wire experiment response data into computeH2Metrics(data).'
        ];
    h3Interaction.available
        ? [
            `Regular drinkers Heineken share: ${h3Interaction.regularLift?.toFixed(1) ?? 'TBD'}%`,
            `Non-drinkers Heineken share: ${h3Interaction.nonDrinkerLift?.toFixed(1) ?? 'TBD'}%`,
            `Interaction effect (mother brand × regular drinker): ${h3Interaction.interactionEffect?.toFixed(2) ?? 'TBD'}`
        ]
        : [
            'Pending / Needs Data Hookup — segment response data by drinking habit (non-drinker, occasional, regular).',
            `Current segment counts: non-drinkers ${h3Segments.non_drinkers.length}, occasional ${h3Segments.occasional.length}, regular ${h3Segments.regular.length}.`,
            'TODO: estimate interaction between mother-brand lift and regular-drinker segment.'
        ];
    const brandOptions = useMemo(() => categoryFilters[category].brands, [category]);
  const formatOptions = useMemo(() => categoryFilters[category].formats, [category]);
  const scenarioOptions = useMemo(() => categoryFilters[category].scenarios, [category]);

  const filtered = comparisons.filter((item) => {
    if (item.category !== category) return false;
    if (brandOptions.length && brandFilter !== 'all' && !item.brandTags.includes(brandFilter)) return false;
    if (formatOptions.length && formatFilter !== 'all' && !item.formatTags.includes(formatFilter)) return false;
    return !(scenarioOptions.length && scenarioFilter !== 'all' && !item.scenarioTags.includes(scenarioFilter));

  });

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="space-y-6">
      <Tabs options={categoryTabs} value={category} onChange={setCategory} />
      {(brandOptions.length || formatOptions.length || scenarioOptions.length) && (
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-3">
          {brandOptions.length ? (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-slate-500">Brand set</p>
              <div className="flex flex-wrap gap-2">
                {['all', ...brandOptions].map((brand) => (
                  <Chip
                    key={brand}
                    label={brand === 'all' ? 'All' : brand}
                    selected={brandFilter === brand}
                    onClick={() => setBrandFilter(brand)}
                  />
                ))}
              </div>
            </div>
          ) : null}
          {formatOptions.length ? (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-slate-500">Package format</p>
              <div className="flex flex-wrap gap-2">
                {['all', ...formatOptions].map((format) => (
                  <Chip
                    key={format}
                    label={format === 'all' ? 'All' : formatLabels[format] ?? format}
                    selected={formatFilter === format}
                    onClick={() => setFormatFilter(format)}
                  />
                ))}
              </div>
            </div>
          ) : null}
          {scenarioOptions.length ? (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-slate-500">Scenario</p>
              <div className="flex flex-wrap gap-2">
                {['all', ...scenarioOptions].map((scenario) => (
                  <Chip
                    key={scenario}
                    label={scenario === 'all' ? 'All' : scenarioLabels[scenario] ?? scenario}
                    selected={scenarioFilter === scenario}
                    onClick={() => setScenarioFilter(scenario)}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((item) => {
          const dataTable = (
            <table className="w-full">
              <tbody>
                {item.options.map((option) => (
                  <tr key={option.label} className="border-b border-slate-200 last:border-0">
                    <td className="py-1 text-left font-medium text-slate-700">{option.label}</td>
                    <td className="py-1 text-right text-slate-600">{option.value}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );

          return (
            <ChartCard
              key={item.id}
              title={item.title}
              interpretation={item.interpretation}
              stats={item.stats}
              dataTable={dataTable}
            >
              <DonutChart data={item.options} ariaLabel={`${item.title} comparison chart`} />
            </ChartCard>
          );
        })}
      </div>
      {filtered.length > 6 ? (
        <button
          type="button"
          className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:border-slate-400"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? 'Show less' : 'Show all'}
        </button>
      ) : null}
      <div id="hypotheses" className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Hypotheses Analysis</p>
          <h3 className="text-2xl font-semibold text-slate-900">Hypotheses Analysis</h3>
          <p className="mt-2 text-sm text-slate-600">
            Evidence-driven checks tie the purchase outcomes to the study hypotheses, including brand equity effects
            and segment differences.
          </p>
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
                    <span className="text-xs uppercase tracking-wide text-slate-500">Decision</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles.Supported}`}>
                      Supported
                    </span>
                    <span className="text-xs text-slate-500">Decision based on forced-choice outcomes across 1v1 tasks.</span>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                        <div className="space-y-4">
                          <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Methodology</p>
                              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                                  <li>
                                      <span className="font-medium text-slate-700">Test:</span> One-sided proportion test assessing whether the
                                      probability of choosing Heineken 0.0 exceeds chance (<span className="font-mono">p = 0.5</span>).
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
                                      One-sided significance: <span className="font-mono">p &lt; 10^-40</span>.
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
                        title="Heineken vs Star Brew share"
                        dataTable={(
                          <table className="min-w-0 text-sm ">
                            <tbody>
                              {h1ChartData.map((entry) => (
                                <tr key={entry.label} className="border-b border-slate-200 last:border-0">
                                  <td className="py-1 text-left font-medium text-slate-700">{entry.label}</td>
                                  <td className="py-1 text-right text-slate-600">{entry.value}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      >
                        <HorizontalBarChart
                          data={h1ChartData}
                          ariaLabel="Heineken vs Fictional brands bar chart"
                          valueSuffix=" selections"
                          valueLabel="Selections"
                        />
                      </ChartCard>
                      <ChartCard
                        title="Price sensitivity"
                        dataTable={(
                          <table className="w-full text-sm">
                            <tbody>
                              {h1PriceComparison.map((entry) => (
                                <tr key={entry.label} className="border-b border-slate-200 last:border-0">
                                  <td className="py-1 text-left font-medium text-slate-700">{entry.label}</td>
                                  <td className="py-1 text-right text-slate-600">{entry.heineken} / {entry.fictional}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      >
                        <GroupedBarChart
                          data={h1PriceComparison}
                          series={[
                            { key: 'heineken', label: 'Heineken 0.0' },
                            { key: 'fictional', label: 'Fictional brand' }
                          ]}
                          ariaLabel="Price sensitivity grouped bar chart"
                        />
                      </ChartCard>
                    </div>
                  </div>
                </div>
              )
            },
            {
              id: 'hypothesis-h2',
              title:
                'H2: Brand perception scores for Heineken will positively correlate with purchase behavior and intent for Heineken 0.0.',
              content: (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs uppercase tracking-wide text-slate-500">Decision</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[h2Decision]}`}>
                      {h2Decision}
                    </span>
                    <span className="text-xs text-slate-500">
                      Tests examine correlations between perception metrics and Heineken choice/intent.
                    </span>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                        <div className="space-y-4">
                          <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hypothesis (H2)</p>
                              <p className="mt-2 text-sm text-slate-600">
                                  Brand perception scores for Heineken are positively correlated with purchase behavior and purchase intent for
                                  Heineken&nbsp;0.0.
                              </p>
                          </div>

                          <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Perception Index</p>
                              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                                  <li>Composite index derived from respondent evaluations of trustworthiness, expected taste, expected quality, and brand familiarity.</li>
                                  <li>Scores aggregated and segmented into four ordered perception bands.</li>
                              </ul>
                          </div>

                          <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Results</p>
                              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                                  <li>
                                      Purchase likelihood increases monotonically as overall brand perception improves, with medians rising
                                      consistently across perception bands.
                                  </li>
                                  <li>
                                      Higher perception categories exhibit both higher central tendency and reduced variance in purchase likelihood.
                                  </li>
                                  <li>
                                      Correlation analysis indicates a strong positive association:
                                      <span className="ml-1 font-mono">r = 0.724</span>, <span className="font-mono">p = 2.29 × 10^-68</span>.
                                  </li>
                              </ul>
                          </div>

                          <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conclusion</p>
                              <p className="mt-2 text-sm text-slate-600">
                                  H2 is supported. The null hypothesis of no relationship between brand perception and purchase intent is decisively
                                  rejected. Higher perceived trust, quality, taste expectations, and familiarity strongly predict increased
                                  likelihood to purchase Heineken&nbsp;0.0.
                              </p>
                          </div>

                          <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Figure Note</p>
                              <p className="mt-2 text-sm text-slate-600">
                                  Figure&nbsp;46 presents a box plot of purchase likelihood by average brand perception score. Median values
                                  (highlighted in blue) and quartile distributions show a clear upward trend across perception categories,
                                  visually confirming the positive correlation.
                              </p>
                          </div>

                          <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Executive Implication</p>
                              <p className="mt-2 text-sm text-slate-600">
                                  Brand perception is a primary driver of conversion. Investments that strengthen perceived quality, taste
                                  expectations, and brand trust are likely to translate directly into higher purchase intent and sales performance.
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
                </div>
              )
            },
            {
              id: 'hypothesis-h3',
              title:
                'H3: The impact of the mother brand on purchase behavior will be stronger for regular alcohol drinkers than non-drinkers.',
              content: (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs uppercase tracking-wide text-slate-500">Decision</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[h3Decision]}`}>
                      {h3Decision}
                    </span>
                    <span className="text-xs text-slate-500">Segment-level analysis compares mother-brand lift by drinking habit.</span>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                      <div className="space-y-4">
                          <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Methodology</p>
                              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                                  <li>
                                      Purchase choices analyzed across all experimental scenarios, with respondents segmented into regular and
                                      non-regular drinkers based on self-reported alcohol consumption frequency.
                                  </li>
                                  <li>
                                      Mother-brand selection defined as choosing a recognized parent brand within each choice task.
                                  </li>
                                  <li>
                                      Analysis included all eligible observations (5,774 choices from 413 respondents) and applied statistical
                                      testing that accounts for repeated measures at the individual level.
                                  </li>
                              </ul>
                          </div>

                          <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Results</p>
                              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                                  <li>
                                      Mother-brand selection rates were similar across consumption segments: 45.4% among regular drinkers versus
                                      42.3% among non-regular drinkers.
                                  </li>
                                  <li>
                                      The difference is not statistically significant (odds ratio = 1.14; 95% CI: 0.93–1.38; <span className="font-mono">p = 0.208</span>).
                                  </li>
                                  <li>
                                      Results indicate no meaningful moderation effect of drinking frequency on mother-brand choice.
                                  </li>
                              </ul>
                          </div>

                          <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conclusion (H3)</p>
                              <p className="mt-2 text-sm text-slate-600">
                                  Hypothesis&nbsp;3 is rejected. There is no evidence that the influence of the mother brand on purchase behavior
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
                            <tbody>
                              {h3SegmentLift.map((entry) => (
                                <tr key={entry.label} className="border-b border-slate-200 last:border-0">
                                  <td className="py-1 text-left font-medium text-slate-700">{entry.label}</td>
                                  <td className="py-1 text-right text-slate-600">{entry.value}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      >
                        <HorizontalBarChart data={h3SegmentLift} ariaLabel="Mother-brand lift by drinking habit bar chart" />
                      </ChartCard>
                    </div>
                  </div>
                </div>
              )
            }
          ]}
        />
      </div>
    </div>
  );
};

export default ResultsExplorer;

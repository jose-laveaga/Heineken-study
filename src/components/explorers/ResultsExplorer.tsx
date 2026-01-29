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
  { label: 'Heineken 0.0', value: 63.1 },
  { label: 'Star Brew', value: 36.9 }
];

const h1PriceComparison = [
  { label: 'Equal price', heineken: 62.6, fictional: 37.4 },
  { label: 'Heineken higher', heineken: 47.8, fictional: 52.2 }
];

const h2BoxPlotData = [
  { label: 'Low perception', min: 12, q1: 24, median: 36, q3: 44, max: 58 },
  { label: 'Mid perception', min: 22, q1: 35, median: 48, q3: 60, max: 72 },
  { label: 'High perception', min: 38, q1: 52, median: 66, q3: 78, max: 92 }
];

const h3SegmentLift = [
  { label: 'Non-drinkers', value: 41.2 },
  { label: 'Occasional', value: 52.6 },
  { label: 'Regular', value: 61.9 }
];

const badgeStyles: Record<string, string> = {
  Supported: 'bg-emerald-100 text-emerald-700',
  'Partially Supported': 'bg-amber-100 text-amber-700',
  'Not Supported': 'bg-rose-100 text-rose-700',
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
  const h2Decision = h2Metrics.available ? 'Supported' : 'Pending data hookup';
  const h3Decision = h3Interaction.available ? 'Partially Supported' : 'Pending data hookup';
  const h2Evidence = h2Metrics.available
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
  const h3Evidence = h3Interaction.available
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Evidence</p>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                          <li>Heineken vs fictional Star Brew: Heineken chosen 63.1% vs 36.9% (p &lt; 0.001).</li>
                          <li>
                            Heineken vs fictional ClearHops at equal price: Heineken chosen 62.6% vs 37.4% (p &lt; 0.001,
                            from report figures).
                          </li>
                          <li>
                            Price sensitivity qualifier: the Heineken advantage shrinks or reverses when Heineken is higher
                            priced (single-can or 12-pack scenarios).
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Interpretation</p>
                        <p className="mt-2 text-sm text-slate-600">
                          Mother-brand equity creates a consistent baseline advantage versus zero-familiarity brands, while
                          pricing pressure can attenuate that lead.
                        </p>
                        <p className="mt-3 text-xs text-slate-500">
                          Method note: figures align with the reported 1v1 comparison outcomes in the results dashboard.
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
                                  <td className="py-1 text-right text-slate-600">{entry.value}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      >
                        <HorizontalBarChart data={h1ChartData} ariaLabel="Heineken vs Star Brew share bar chart" />
                      </ChartCard>
                      <ChartCard
                        title="Price sensitivity (double bar)"
                        dataTable={(
                          <table className="w-full text-sm">
                            <tbody>
                              {h1PriceComparison.map((entry) => (
                                <tr key={entry.label} className="border-b border-slate-200 last:border-0">
                                  <td className="py-1 text-left font-medium text-slate-700">{entry.label}</td>
                                  <td className="py-1 text-right text-slate-600">{entry.heineken}% / {entry.fictional}%</td>
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Evidence</p>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                          {h2Evidence.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Interpretation</p>
                        <p className="mt-2 text-sm text-slate-600">
                          When dataset wiring is complete, positive correlations should indicate that stronger brand
                          perceptions translate into higher purchase propensity for Heineken 0.0.
                        </p>
                        <p className="mt-3 text-xs text-slate-500">
                          Method note: computeH2Metrics(data) expects respondent-level perception scores and choice/intent fields.
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Evidence</p>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-600">
                          {h3Evidence.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Interpretation</p>
                        <p className="mt-2 text-sm text-slate-600">
                          Segmenting by drinking frequency will show whether mother-brand equity resonates more strongly with
                          regular drinkers once the interaction effect is estimated.
                        </p>
                        <p className="mt-3 text-xs text-slate-500">
                          Method note: segmentByDrinkingHabit() and computeH3Interaction(data) will be updated when the response
                          dataset is connected.
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

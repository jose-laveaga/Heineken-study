import { useMemo, useState } from 'react';
import Tabs from '../ui/Tabs';
import Chip from '../ui/Chip';
import ChartCard from '../charts/ChartCard';
import DonutChart from '../charts/DonutChart';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import resultsComparisons from '../../data/resultsComparisons.json';

const categoryTabs = [
  { id: '1v1_nonpriced', label: '1v1 (No Price)' },
  { id: '1v1_priced', label: '1v1 (Price)' },
  { id: 'multi_brand', label: 'Multi-Brand' }
];

const formatLabels: Record<string, string> = {
  bottle: 'Bottle',
  can: 'Can',
  '12-pack': '12-pack'
};

const scenarioLabels: Record<string, string> = {
  no_price: 'No price',
  equal_price: 'Equal price',
  heineken_cheaper: 'Heineken cheaper',
  competitor_cheaper: 'Competitor cheaper',
  multi_brand: 'Multi-brand'
};

const ResultsExplorer = () => {
  // TODO: Replace placeholder values in /src/data/resultsComparisons.json with final study numbers.
  const [category, setCategory] = useState('1v1_nonpriced');
  const [brandFilter, setBrandFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [scenarioFilter, setScenarioFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const comparisons = resultsComparisons.comparisons;

  const brandOptions = useMemo(() => {
    const brands = new Set<string>();
    comparisons.forEach((item) => item.brandTags.forEach((tag) => brands.add(tag)));
    return ['all', ...Array.from(brands)];
  }, [comparisons]);

  const formatOptions = useMemo(() => {
    const formats = new Set<string>();
    comparisons.forEach((item) => item.formatTags.forEach((tag) => formats.add(tag)));
    return ['all', ...Array.from(formats)];
  }, [comparisons]);

  const scenarioOptions = useMemo(() => {
    const scenarios = new Set<string>();
    comparisons.forEach((item) => item.scenarioTags.forEach((tag) => scenarios.add(tag)));
    return ['all', ...Array.from(scenarios)];
  }, [comparisons]);

  const filtered = comparisons.filter((item) => {
    if (item.category !== category) return false;
    if (brandFilter !== 'all' && !item.brandTags.includes(brandFilter)) return false;
    if (formatFilter !== 'all' && !item.formatTags.includes(formatFilter)) return false;
    if (scenarioFilter !== 'all' && !item.scenarioTags.includes(scenarioFilter)) return false;
    return true;
  });

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="space-y-6">
      <Tabs options={categoryTabs} value={category} onChange={setCategory} />
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-3">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-slate-500">Brand set</p>
          <div className="flex flex-wrap gap-2">
            {brandOptions.map((brand) => (
              <Chip
                key={brand}
                label={brand === 'all' ? 'All' : brand.replace('_', ' ')}
                selected={brandFilter === brand}
                onClick={() => setBrandFilter(brand)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-slate-500">Package format</p>
          <div className="flex flex-wrap gap-2">
            {formatOptions.map((format) => (
              <Chip
                key={format}
                label={format === 'all' ? 'All' : formatLabels[format] ?? format}
                selected={formatFilter === format}
                onClick={() => setFormatFilter(format)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-slate-500">Scenario</p>
          <div className="flex flex-wrap gap-2">
            {scenarioOptions.map((scenario) => (
              <Chip
                key={scenario}
                label={scenario === 'all' ? 'All' : scenarioLabels[scenario] ?? scenario}
                selected={scenarioFilter === scenario}
                onClick={() => setScenarioFilter(scenario)}
              />
            ))}
          </div>
        </div>
      </div>
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
              {item.options.length <= 2 ? (
                <DonutChart data={item.options} ariaLabel={`${item.title} comparison chart`} />
              ) : (
                <HorizontalBarChart data={item.options} ariaLabel={`${item.title} share chart`} />
              )}
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
    </div>
  );
};

export default ResultsExplorer;

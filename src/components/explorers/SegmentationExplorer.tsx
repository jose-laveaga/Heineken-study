import { useMemo, useState } from 'react';
import Tabs from '../ui/Tabs';
import Chip from '../ui/Chip';
import GroupedBarChart from '../charts/GroupedBarChart';
import ChartCard from '../charts/ChartCard';
import segmentation from '../../data/segmentation.json';

const metricLabels: Record<string, string> = {
  mother_brands: 'Mother-brand pick rate',
  heineken: 'Heineken pick rate'
};

const SegmentationExplorer = () => {
  // TODO: Replace placeholder values in /src/data/segmentation.json with final study numbers.
  const [metric, setMetric] = useState(segmentation.metrics[0]);
  const [threshold, setThreshold] = useState(segmentation.thresholds[0]);
  const [dimension, setDimension] = useState(segmentation.dimensions[0]?.key ?? '');

  const dimensionOptions = segmentation.dimensions.map((item) => ({ id: item.key, label: item.label }));

  const activeDimension = segmentation.dimensions.find((item) => item.key === dimension);

  const chartData = useMemo(() => {
    if (!activeDimension) return [];
    return activeDimension.groups.map((group) => ({
      label: group.label,
      value: group.values[metric][String(threshold)]
    }));
  }, [activeDimension, metric, threshold]);

  const dataTable = (
    <table className="w-full">
      <tbody>
        {chartData.map((item) => (
          <tr key={item.label} className="border-b border-slate-200 last:border-0">
            <td className="py-1 text-left font-medium text-slate-700">{item.label}</td>
            <td className="py-1 text-right text-slate-600">{item.value}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {segmentation.metrics.map((item) => (
            <Chip
              key={item}
              label={metricLabels[item] ?? item}
              selected={metric === item}
              onClick={() => setMetric(item)}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {segmentation.thresholds.map((value) => (
            <Chip
              key={value}
              label={`${value}% threshold`}
              selected={threshold === value}
              onClick={() => setThreshold(value)}
            />
          ))}
        </div>
      </div>
      <Tabs options={dimensionOptions} value={dimension} onChange={setDimension} />
      <ChartCard
        title={`${activeDimension?.label ?? ''} segments`}
        interpretation={`Shares indicate the portion of each segment exceeding the ${threshold}% ${metricLabels[metric] ?? metric} threshold.`}
        footnote="Thresholds reflect the minimum pick rate required to qualify a segment as high affinity."
        dataTable={dataTable}
      >
        <GroupedBarChart
          data={chartData}
          series={[{ key: 'value', label: 'Share above threshold' }]}
          ariaLabel="Segmentation threshold chart"
        />
      </ChartCard>
    </div>
  );
};

export default SegmentationExplorer;

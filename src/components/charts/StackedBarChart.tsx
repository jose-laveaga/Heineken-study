import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';
import { chartPalette } from './chartTheme';

interface DistributionItem {
  label: string;
  values: Record<string, number>;
}

interface StackedBarChartProps {
  data: DistributionItem[];
  keys: string[];
  ariaLabel: string;
}

const StackedBarChart = ({ data, keys, ariaLabel }: StackedBarChartProps) => {
  const mapped = data.map((item) => ({
    label: item.label,
    ...item.values
  }));

  return (
    <div className="h-56" role="img" aria-label={ariaLabel}>
      <ResponsiveContainer>
        <BarChart data={mapped} layout="vertical" margin={{ top: 10, right: 16, left: 12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis dataKey="label" type="category" tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip />
          <Legend />
          {keys.map((key, index) => (
            <Bar key={key} dataKey={key} stackId="a" fill={chartPalette[index % chartPalette.length]} radius={[0, 0, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;

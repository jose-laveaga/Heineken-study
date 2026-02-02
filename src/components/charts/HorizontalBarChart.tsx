import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { chartPalette } from './chartTheme';

interface HorizontalBarChartProps {
  data: { label: string; value: number }[];
  ariaLabel: string;
  valueSuffix?: string;
  valueLabel?: string;
}

const HorizontalBarChart = ({
  data,
  ariaLabel,
  valueSuffix = '%',
  valueLabel = 'Share'
}: HorizontalBarChartProps) => (
  <div className="h-56" role="img" aria-label={ariaLabel}>
    <ResponsiveContainer>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 16, left: 16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#d4c6ad" />
        <XAxis type="number" tick={{ fill: '#5c6f82', fontSize: 16 }} />
        <YAxis dataKey="label" type="category" tick={{ fill: '#5c6f82', fontSize: 16 }} width={100} />
        <Tooltip formatter={(value: number) => [`${value}${valueSuffix}`, valueLabel]} />
        <Bar dataKey="value" fill={chartPalette[1]} radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default HorizontalBarChart;

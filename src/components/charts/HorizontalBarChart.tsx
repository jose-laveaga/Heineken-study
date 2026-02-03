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
  data: { label: string; value: number; share?: number; percent?: number }[];
  ariaLabel: string;
  valueSuffix?: string;
  valueLabel?: string;
  xAxisTickFormatter?: (value: number) => string;
}

const HorizontalBarChart = ({
  data,
  ariaLabel,
  valueSuffix = '%',
  valueLabel = 'Share',
  xAxisTickFormatter
}: HorizontalBarChartProps) => (
  <div className="h-56" role="img" aria-label={ariaLabel}>
    <ResponsiveContainer>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 16, left: 16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#d4c6ad" />
        <XAxis
          type="number"
          tick={{ fill: '#5c6f82', fontSize: 16 }}
          tickFormatter={xAxisTickFormatter}
        />
        <YAxis dataKey="label" type="category" tick={{ fill: '#5c6f82', fontSize: 16 }} width={100} />
        <Tooltip
          formatter={(value: number, _name, props) => {
            const payload = props.payload as { share?: number; percent?: number } | undefined;
            if (payload && typeof payload.share === 'number' && typeof payload.percent === 'number') {
              return [`${payload.share} (${payload.percent.toFixed(1)}%)`, valueLabel];
            }
            return [`${value}${valueSuffix}`, valueLabel];
          }}
        />
        <Bar dataKey="value" fill={chartPalette[1]} radius={[0, 6, 6, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default HorizontalBarChart;

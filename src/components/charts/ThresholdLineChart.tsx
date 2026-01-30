import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { chartPalette } from './chartTheme';

interface SeriesDefinition {
  key: string;
  label: string;
}

interface ThresholdLineChartProps {
  data: Array<{ label: string; [key: string]: number | string }>;
  series: SeriesDefinition[];
  xAxisLabel: string;
  yAxisLabel: string;
  ariaLabel: string;
}

const ThresholdLineChart = ({
  data,
  series,
  xAxisLabel,
  yAxisLabel,
  ariaLabel
}: ThresholdLineChartProps) => (
  <div className="h-64" role="img" aria-label={ariaLabel}>
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 10, right: 16, left: 8, bottom: 12 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="label"
          tick={{ fill: '#64748b', fontSize: 12 }}
          label={{ value: xAxisLabel, position: 'insideBottom', offset: -6, fill: '#94a3b8', fontSize: 11 }}
        />
        <YAxis
          domain={[0, 100]}
          tickFormatter={(value) => `${value}%`}
          tick={{ fill: '#64748b', fontSize: 12 }}
          label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
        />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend verticalAlign="top" height={36}/>
        {series.map((item, index) => (
          <Line
            key={item.key}
            type="monotone"
            dataKey={item.key}
            name={item.label}
            stroke={chartPalette[index % chartPalette.length]}
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default ThresholdLineChart;

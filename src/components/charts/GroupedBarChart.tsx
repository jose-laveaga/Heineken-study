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

interface Series {
  key: string;
  label: string;
}

interface GroupedBarChartProps {
  data: Array<{ label: string; [key: string]: number | string }>;
  series: Series[];
  ariaLabel: string;
  yAxisTickFormatter?: (value: number) => string;
}

const GroupedBarChart = ({ data, series, ariaLabel, yAxisTickFormatter }: GroupedBarChartProps) => (
  <div className="h-64" role="img" aria-label={ariaLabel}>
    <ResponsiveContainer>
      <BarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#d4c6ad" />
        <XAxis dataKey="label" tick={{ fill: '#5c6f82', fontSize: 12 }} />
        <YAxis tick={{ fill: '#5c6f82', fontSize: 12 }} tickFormatter={yAxisTickFormatter} />
        <Tooltip
          formatter={(value: number, name, props) => {
            const dataKey = props.dataKey as string;
            const payload = props.payload as Record<string, number> | undefined;
            const shareKey = `${dataKey}Share`;
            const percentKey = `${dataKey}Percent`;
            const shareValue = payload?.[shareKey];
            const percentValue = payload?.[percentKey];
            if (typeof shareValue === 'number' && typeof percentValue === 'number') {
              return [`${shareValue} (${percentValue.toFixed(1)}%)`, name];
            }
            if (typeof payload?.share === 'number' && typeof payload?.percent === 'number') {
              return [`${payload.share} (${payload.percent.toFixed(1)}%)`, name];
            }
            if (typeof value === 'number') {
              return [value.toString(), name];
            }
            return [value, name];
          }}
        />
        <Legend />
        {series.map((item, index) => (
          <Bar key={item.key} dataKey={item.key} name={item.label} fill={chartPalette[index % chartPalette.length]} radius={[6, 6, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default GroupedBarChart;

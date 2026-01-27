import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { chartPalette } from './chartTheme';

interface DonutChartProps {
  data: { label: string; value: number }[];
  ariaLabel: string;
}

const DonutChart = ({ data, ariaLabel }: DonutChartProps) => (
  <div className="h-52" role="img" aria-label={ariaLabel}>
    <ResponsiveContainer>
      <PieChart>
        <Tooltip
          formatter={(value: number) => [`${value}%`, 'Share']}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          stroke="transparent"
        >
          {data.map((entry, index) => (
            <Cell key={entry.label} fill={chartPalette[index % chartPalette.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default DonutChart;

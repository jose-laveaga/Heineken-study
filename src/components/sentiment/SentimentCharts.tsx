import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import ChartCard from '../charts/ChartCard';
import { SentimentByBrand } from '../../data/sentimentByBrand';

const sentimentColors = {
  positive: '#16a34a',
  neutral: '#f59e0b',
  negative: '#ef4444',
  avg: '#0f172a'
};

interface SentimentChartsProps {
  data: SentimentByBrand[];
  categoryAverage: number;
}

const SentimentCharts = ({ data, categoryAverage }: SentimentChartsProps) => {
  const avgData = [...data]
    .sort((a, b) => b.avgSentiment - a.avgSentiment)
    .map((item) => ({
      brand: item.brand,
      avgSentiment: Number(item.avgSentiment.toFixed(2)),
      totalCount: item.totalCount
    }));

  const distributionData = [...data]
    .sort((a, b) => b.avgSentiment - a.avgSentiment)
    .map((item) => ({
      brand: item.brand,
      positivePct: item.positivePct,
      neutralPct: item.neutralPct,
      negativePct: item.negativePct,
      totalCount: item.totalCount
    }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartCard title="Avg Sentiment by Brand" caption="Polarity scale ranges from -1 to +1.">
        <div className="h-72" role="img" aria-label="Average sentiment by brand">
          <ResponsiveContainer>
            <BarChart data={avgData} layout="vertical" margin={{ top: 10, right: 16, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                type="number"
                domain={[-1, 1]}
                ticks={[-1, -0.5, 0, 0.5, 1]}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis dataKey="brand" type="category" width={110} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => [value.toFixed(2), 'Avg sentiment']}
                labelFormatter={(label) => `Brand: ${label}`}
              />
              <ReferenceLine
                x={categoryAverage}
                stroke="#2563eb"
                strokeDasharray="4 4"
                label={{
                  value: `${categoryAverage.toFixed(2)}`,
                  position: 'insideTopRight',
                  fill: '#2563eb',
                  fontSize: 12
                }}
              />
              <Bar dataKey="avgSentiment" fill={sentimentColors.avg} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Sentiment Distribution by Brand" caption="100% stacked distribution of Positive/Neutral/Negative responses.">
        <div className="h-72" role="img" aria-label="Sentiment distribution by brand">
          <ResponsiveContainer>
            <BarChart data={distributionData} layout="vertical" margin={{ top: 10, right: 16, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                type="number"
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(value) => `${value}%`}
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis dataKey="brand" type="category" width={110} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip
                formatter={(value: number, name, props) => {
                  const totalCount = props.payload.totalCount as number;
                  return [`${value.toFixed(1)}% (n=${totalCount})`, name];
                }}
              />
              <Legend />
              <Bar dataKey="positivePct" name="Positive" stackId="a" fill={sentimentColors.positive} />
              <Bar dataKey="neutralPct" name="Neutral" stackId="a" fill={sentimentColors.neutral} />
              <Bar dataKey="negativePct" name="Negative" stackId="a" fill={sentimentColors.negative} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default SentimentCharts;

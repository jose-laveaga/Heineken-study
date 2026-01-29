import Card from '../ui/Card';
import ChartCard from '../charts/ChartCard';

const seriesPalette = [
  { label: 'Segment A', color: '#1d4ed8' },
  { label: 'Segment B', color: '#0f766e' }
];

const chartConfigs = [
  {
    id: 'activity-50',
    title: 'Predicted margins by activity level (>50% mother brand)',
    xAxisLabel: 'Activity level',
    yAxisLabel: 'Probability of mother brand >50% of the time',
    xLabels: ['Low', 'Medium', 'High']
  },
  {
    id: 'activity-75',
    title: 'Predicted margins by activity level (>75% mother brand)',
    xAxisLabel: 'Activity level',
    yAxisLabel: 'Probability of mother brand >75% of the time',
    xLabels: ['Low', 'Medium', 'High']
  },
  {
    id: 'income-50-a',
    title: 'Predicted margins by income (>50% mother brand)',
    xAxisLabel: 'Income',
    yAxisLabel: 'Probability of mother brand >50% of the time',
    xLabels: ['<$50k', '$50–100k', '$100k+']
  },
  {
    id: 'income-75-a',
    title: 'Predicted margins by income (>75% mother brand)',
    xAxisLabel: 'Income',
    yAxisLabel: 'Probability of mother brand >75% of the time',
    xLabels: ['<$50k', '$50–100k', '$100k+']
  },
  {
    id: 'income-50-b',
    title: 'Predicted margins by income (>50% mother brand)',
    xAxisLabel: 'Income',
    yAxisLabel: 'Probability of mother brand >50% of the time',
    xLabels: ['<$50k', '$50–100k', '$100k+']
  },
  {
    id: 'income-75-b',
    title: 'Predicted margins by income (>75% mother brand)',
    xAxisLabel: 'Income',
    yAxisLabel: 'Probability of mother brand >75% of the time',
    xLabels: ['<$50k', '$50–100k', '$100k+']
  }
];

const placeholderSeries = [
  [
    { value: 0.28, error: 0.05 },
    { value: 0.41, error: 0.04 },
    { value: 0.52, error: 0.06 }
  ],
  [
    { value: 0.22, error: 0.04 },
    { value: 0.35, error: 0.05 },
    { value: 0.46, error: 0.04 }
  ]
];

const coefficientRows = [
  { variable: 'Activity level (high)', coefficient: '0.42', pValue: '0.018' },
  { variable: 'Activity level (medium)', coefficient: '0.21', pValue: '0.091' },
  { variable: 'Income (mid)', coefficient: '0.35', pValue: '0.044' },
  { variable: 'Income (high)', coefficient: '0.58', pValue: '0.006' },
  { variable: 'Age (35–44)', coefficient: '0.12', pValue: '0.221' },
  { variable: 'Urban residence', coefficient: '0.27', pValue: '0.073' }
];

const PlaceholderLineChart = ({
  xLabels,
  xAxisLabel,
  yAxisLabel
}: {
  xLabels: string[];
  xAxisLabel: string;
  yAxisLabel: string;
}) => {
  const width = 420;
  const height = 200;
  const padding = { top: 20, right: 20, bottom: 32, left: 38 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const xPositions = xLabels.map((_, index) =>
    padding.left + (plotWidth / (xLabels.length - 1)) * index
  );

  const yScale = (value: number) => padding.top + (1 - value) * plotHeight;

  const buildPath = (series: { value: number }[]) =>
    series
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${xPositions[index]} ${yScale(point.value)}`)
      .join(' ');

  return (
    <div className="space-y-2">
      <div className="relative h-44 w-full">
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Predicted margins line chart with 95% confidence intervals"
        >
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={height - padding.bottom}
            stroke="#cbd5f5"
            strokeWidth={2}
          />
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="#cbd5f5"
            strokeWidth={2}
          />
          {placeholderSeries.map((series, seriesIndex) => (
            <g key={`series-${seriesIndex}`}>
              <path
                d={buildPath(series)}
                fill="none"
                stroke={seriesPalette[seriesIndex].color}
                strokeWidth={2.5}
              />
              {series.map((point, pointIndex) => {
                const x = xPositions[pointIndex];
                const y = yScale(point.value);
                const errorTop = yScale(Math.min(1, point.value + point.error));
                const errorBottom = yScale(Math.max(0, point.value - point.error));

                return (
                  <g key={`point-${seriesIndex}-${pointIndex}`}>
                    <line
                      x1={x}
                      y1={errorTop}
                      x2={x}
                      y2={errorBottom}
                      stroke={seriesPalette[seriesIndex].color}
                      strokeWidth={1.5}
                    />
                    <line
                      x1={x - 6}
                      y1={errorTop}
                      x2={x + 6}
                      y2={errorTop}
                      stroke={seriesPalette[seriesIndex].color}
                      strokeWidth={1.5}
                    />
                    <line
                      x1={x - 6}
                      y1={errorBottom}
                      x2={x + 6}
                      y2={errorBottom}
                      stroke={seriesPalette[seriesIndex].color}
                      strokeWidth={1.5}
                    />
                    <circle cx={x} cy={y} r={4} fill={seriesPalette[seriesIndex].color} />
                  </g>
                );
              })}
            </g>
          ))}
          {xLabels.map((label, index) => (
            <text
              key={label}
              x={xPositions[index]}
              y={height - 10}
              textAnchor="middle"
              fontSize="10"
              fill="#64748b"
            >
              {label}
            </text>
          ))}
        </svg>
        <div className="absolute right-3 top-3 rounded-lg border border-slate-200 bg-white/90 px-2 py-1 text-[11px] text-slate-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-full" style={{ backgroundColor: seriesPalette[0].color }} />
            <span>{seriesPalette[0].label}</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-4 rounded-full" style={{ backgroundColor: seriesPalette[1].color }} />
            <span>{seriesPalette[1].label}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span className="font-medium text-slate-600">X-axis: {xAxisLabel}</span>
        <span className="font-medium text-slate-600">Y-axis: {yAxisLabel}</span>
      </div>
    </div>
  );
};

const StandardLogisticRegressionSection = () => (
  <div className="space-y-8">
    <Card>
      <p className="text-xs uppercase tracking-wide text-slate-500">Standard logistic regression analysis</p>
      <div className="mt-4 grid gap-4 text-sm text-slate-600">
        <p>
          Placeholder summary: Add interpretation of model fit, key predictors, and directional effects for the mother
          brand outcome.
        </p>
        <p>Placeholder notes: Describe which covariates were controlled, weighting applied, and any robustness checks.</p>
      </div>
    </Card>

    <div className="grid gap-6 lg:grid-cols-2">
      {chartConfigs.map((chart) => (
        <ChartCard
          key={chart.id}
          title={chart.title}
          caption="Predicted margins (marginal means) with 95% confidence intervals"
        >
          <PlaceholderLineChart
            xLabels={chart.xLabels}
            xAxisLabel={chart.xAxisLabel}
            yAxisLabel={chart.yAxisLabel}
          />
        </ChartCard>
      ))}
    </div>

    <Card>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Model coefficients (placeholder)</p>
          <p className="mt-1 text-sm text-slate-600">
            Replace with final coefficient estimates and significance values from the standard logistic regression.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2 text-left">Variable</th>
                <th className="px-3 py-2 text-right">Coefficient</th>
                <th className="px-3 py-2 text-right">P-value</th>
              </tr>
            </thead>
            <tbody>
              {coefficientRows.map((row) => (
                <tr key={row.variable} className="border-t border-slate-200">
                  <td className="px-3 py-2 text-left text-slate-700">{row.variable}</td>
                  <td className="px-3 py-2 text-right text-slate-600">{row.coefficient}</td>
                  <td className="px-3 py-2 text-right text-slate-600">{row.pValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>

    <Card>
      <p className="text-xs uppercase tracking-wide text-slate-500">Explanation and narrative space</p>
      <div className="mt-3 grid gap-2 text-sm text-slate-600">
        <p>Placeholder: Summarize how the predicted margins align with the segment story.</p>
        <p>Placeholder: Describe noteworthy confidence interval overlap and where the probabilities diverge.</p>
        <p>Placeholder: Add any caveats, model diagnostics, and next-step recommendations.</p>
      </div>
    </Card>
  </div>
);

export default StandardLogisticRegressionSection;

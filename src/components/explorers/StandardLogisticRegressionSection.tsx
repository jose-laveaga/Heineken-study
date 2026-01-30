import Card from '../ui/Card';
import ChartCard from '../charts/ChartCard';
import LineChartWithErrorBars from '../charts/LineChartWithErrorBars';

const seriesPalette = [
  { label: 'Male', color: '#1d4ed8' },
  { label: 'Female', color: '#0f766e' }
];

const chartConfigs = [
  {
    id: 'activity-50',
    title: 'Predicted margins by activity level (>50% mother brand)',
    xAxisLabel: 'Activity level',
    yAxisLabel: 'Probability of mother brand >50% of the time',
    xLabels: ['minimal', 'basic', 'active', 'moderately active', 'highly active']
  },
  {
    id: 'activity-75',
    title: 'Predicted margins by activity level (>75% mother brand)',
    xAxisLabel: 'Activity level',
    yAxisLabel: 'Probability of mother brand >75% of the time',
    xLabels: ['minimal', 'basic', 'active', 'moderately active', 'highly active']
  },
  {
    id: 'income-50-a',
    title: 'Predicted margins by income (>50% mother brand)',
    xAxisLabel: 'Income',
    yAxisLabel: 'Probability of mother brand >50% of the time',
    xLabels: ['<$25k', '$50–74k','$75–99k', '$100–149k', '$150k+']
  },
  {
    id: 'income-75-a',
    title: 'Predicted margins by income (>75% mother brand)',
    xAxisLabel: 'Income',
    yAxisLabel: 'Probability of mother brand >75% of the time',
    xLabels: ['<$25k', '$50–74k','$75–99k', '$100–149k', '$150k+']
  },
  {
    id: 'agegroup-50-b',
    title: 'Predicted margins by income (>50% mother brand)',
    xAxisLabel: 'Age Group',
    yAxisLabel: 'Probability of mother brand >50% of the time',
    xLabels: ['21-24', '25-34', '35-44', '45-54', '55-65', '65+']
  },
  {
    id: 'agegroup-75-b',
    title: 'Predicted margins by income (>75% mother brand)',
    xAxisLabel: 'Age Group',
    yAxisLabel: 'Probability of mother brand >75% of the time',
    xLabels: ['21-24', '25-34', '35-44', '45-54', '55-65', '65+']
  }
];


// Point estimates + estimated 95% CI half-widths (error) read from the plots.

export const seriesByChartId: Record<
    string,
    Array<{
        label: string;
        color: string;
        points: Array<{ value: number; error: number }>;
    }>
> = {
    'activity-50': [
        {
            label: seriesPalette[0].label,
            color: seriesPalette[0].color,
            points: [
                { value: 0.40, error: 0.18 }, // minimal
                { value: 0.50, error: 0.12 }, // basic
                { value: 0.61, error: 0.09 }, // active
                { value: 0.57, error: 0.10 }, // moderately active
                { value: 0.33, error: 0.20 }  // highly active
            ]
        },
        {
            label: seriesPalette[1].label,
            color: seriesPalette[1].color,
            points: [
                { value: 0.33, error: 0.18 }, // minimal
                { value: 0.43, error: 0.12 }, // basic
                { value: 0.54, error: 0.10 }, // active
                { value: 0.49, error: 0.11 }, // moderately active
                { value: 0.27, error: 0.20 }  // highly active
            ]
        }
    ],

    'activity-75': [
        {
            label: seriesPalette[0].label,
            color: seriesPalette[0].color,
            points: [
                { value: 0.08, error: 0.14 }, // minimal
                { value: 0.12, error: 0.06 }, // basic
                { value: 0.12, error: 0.06 }, // active
                { value: 0.14, error: 0.08 }, // moderately active
                { value: 0.11, error: 0.18 }  // highly active
            ]
        },
        {
            label: seriesPalette[1].label,
            color: seriesPalette[1].color,
            points: [
                { value: 0.10, error: 0.17 }, // minimal
                { value: 0.15, error: 0.11 }, // basic
                { value: 0.15, error: 0.09 }, // active
                { value: 0.18, error: 0.10 }, // moderately active
                { value: 0.13, error: 0.22 }  // highly active
            ]
        }
    ],

    'income-50-a': [
        {
            label: seriesPalette[0].label,
            color: seriesPalette[0].color,
            points: [
                { value: 0.46, error: 0.12 }, // <$25k
                { value: 0.51, error: 0.13 }, // $50–74k
                { value: 0.58, error: 0.13 }, // $75–99k
                { value: 0.53, error: 0.14 }, // $100–149k
                { value: 0.34, error: 0.22 }  // $150k+
            ]
        },
        {
            label: seriesPalette[1].label,
            color: seriesPalette[1].color,
            points: [
                { value: 0.39, error: 0.11 }, // <$25k
                { value: 0.44, error: 0.12 }, // $50–74k
                { value: 0.50, error: 0.14 }, // $75–99k
                { value: 0.46, error: 0.15 }, // $100–149k
                { value: 0.28, error: 0.23 }  // $150k+
            ]
        }
    ],

    'income-75-a': [
        {
            label: seriesPalette[0].label,
            color: seriesPalette[0].color,
            points: [
                { value: 0.11, error: 0.09 }, // <$25k
                { value: 0.09, error: 0.06 }, // $50–74k
                { value: 0.14, error: 0.12 }, // $75–99k
                { value: 0.13, error: 0.12 }, // $100–149k
                { value: 0.10, error: 0.22 }  // $150k+
            ]
        },
        {
            label: seriesPalette[1].label,
            color: seriesPalette[1].color,
            points: [
                { value: 0.13, error: 0.10 }, // <$25k
                { value: 0.12, error: 0.09 }, // $50–74k
                { value: 0.17, error: 0.15 }, // $75–99k
                { value: 0.16, error: 0.16 }, // $100–149k
                { value: 0.12, error: 0.27 }  // $150k+
            ]
        }
    ],

    'agegroup-50-b': [
        {
            label: seriesPalette[0].label,
            color: seriesPalette[0].color,
            points: [
                { value: 0.48, error: 0.13 }, // 21-24
                { value: 0.52, error: 0.10 }, // 25-34
                { value: 0.59, error: 0.10 }, // 35-44
                { value: 0.48, error: 0.11 }, // 45-54
                { value: 0.69, error: 0.18 }, // 55-65
                { value: 0.68, error: 0.27 }  // 65+
            ]
        },
        {
            label: seriesPalette[1].label,
            color: seriesPalette[1].color,
            points: [
                { value: 0.41, error: 0.13 }, // 21-24
                { value: 0.44, error: 0.11 }, // 25-34
                { value: 0.52, error: 0.11 }, // 35-44
                { value: 0.40, error: 0.13 }, // 45-54
                { value: 0.62, error: 0.18 }, // 55-65
                { value: 0.61, error: 0.27 }  // 65+
            ]
        }
    ],

    'agegroup-75-b': [
        {
            label: seriesPalette[0].label,
            color: seriesPalette[0].color,
            points: [
                { value: 0.07, error: 0.09 }, // 21-24
                { value: 0.09, error: 0.07 }, // 25-34
                { value: 0.13, error: 0.09 }, // 35-44
                { value: 0.14, error: 0.10 }, // 45-54
                { value: 0.22, error: 0.17 }, // 55-65
                { value: 0.26, error: 0.28 }  // 65+
            ]
        },
        {
            label: seriesPalette[1].label,
            color: seriesPalette[1].color,
            points: [
                { value: 0.09, error: 0.11 }, // 21-24
                { value: 0.11, error: 0.09 }, // 25-34
                { value: 0.16, error: 0.10 }, // 35-44
                { value: 0.17, error: 0.12 }, // 45-54
                { value: 0.27, error: 0.18 }, // 55-65
                { value: 0.31, error: 0.29 }  // 65+
            ]
        }
    ]
};



const coefficientRows = [
  { variable: 'Brand Importance Rating', coefficient: '0.66', pValue: '1.93' },
  { variable: 'Importance of Availability', coefficient: '0.58', pValue: '1.78' },
  { variable: 'Importance of Variety', coefficient: '-0.39', pValue: '0.67' },
  { variable: "Famliarity with O'Doul's", coefficient: '-0.25', pValue: '0.77' },
  { variable: 'Familiarity with Budweiser', coefficient: '0.5', pValue: '1.65' },
];

const StandardLogisticRegressionSection = () => (
  <div className="space-y-8">
    <Card>
      <p className="text-xs uppercase tracking-wide text-slate-500">Standard logistic regression analysis</p>
      <div className="mt-4 grid gap-4 text-sm text-slate-600">
        <p>
            This section presents the predictive margins derived from the regression models used
            to examine how key demographic factors shape the likelihood of predominantly
            choosing model-based (MB) strategies. The figures report predicted probabilities
            with 95% confidence intervals, disaggregated by gender, allowing direct visual
            comparison across activity level, age group, and income. Together, these results
            provide a structured view of how decision-making tendencies vary across subpopulations
            and where gender differences are most pronounced or minimal. The aim is to clarify not
            only the central tendencies but also the uncertainty around these estimates, enabling a
            more precise assessment of demographic patterns that may influence strategic choice behavior.

        </p>


      </div>
    </Card>

    <div className="grid gap-6 lg:grid-cols-2">
      {chartConfigs.map((chart) => (
        <ChartCard
          key={chart.id}
          title={chart.title}
          caption="Predicted margins (marginal means) with 95% confidence intervals"
        >
          <LineChartWithErrorBars
            xLabels={chart.xLabels}
            xAxisLabel={chart.xAxisLabel}
            yAxisLabel={chart.yAxisLabel}
            series={seriesByChartId[chart.id]}
            ariaLabel={`${chart.title} line chart with 95% confidence intervals`}
          />
        </ChartCard>
      ))}
    </div>

    <Card>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Model coefficients</p>
          <p className="mt-1 text-sm text-slate-600">
            Final coefficient estimates and significance values from the standard logistic regression.
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
        <p>
          <strong>Note:</strong>
          *** <em>p</em> &lt; 0.01,
          ** <em>p</em> &lt; 0.05,
          * <em>p</em> &lt; 0.10
        </p>
        <p>Per point increase in each variable category (e.g brand_importance_rating [1] → [2])
            the odds of any given participant choosing mother brands more than 50% of the
            time increase by the [odds ratio]%
        </p>

      </div>
    </Card>
  </div>
);

export default StandardLogisticRegressionSection;

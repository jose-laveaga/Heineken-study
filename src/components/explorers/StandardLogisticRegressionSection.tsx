import Card from '../ui/Card';
import ChartCard from '../charts/ChartCard';
import LineChartWithErrorBars from '../charts/LineChartWithErrorBars';
import BulletList from "../content/BulletList";

const seriesPalette = [
  { label: 'Male', color: '#2f5d62' },
  { label: 'Female', color: '#c08457' }
];

const chartConfigs = [
  {
    id: 'activity-50',
    title: 'Predicted margins by activity level (>50% mother brand)',
    xAxisLabel: 'Activity level',
    yAxisLabel: 'Probability of choosing mother brands > 50% of the time',
    xLabels: ['minimal', 'basic', 'active', 'moderately active', 'highly active']
  },
  {
    id: 'activity-75',
    title: 'Predicted margins by activity level (>75% mother brand)',
    xAxisLabel: 'Activity level',
    yAxisLabel: 'Probability of choosing mother brands > 75% of the time',
    xLabels: ['minimal', 'basic', 'active', 'moderately active', 'highly active']
  },
  {
    id: 'income-50-a',
    title: 'Predicted margins by income (>50% mother brand)',
    xAxisLabel: 'Income',
    yAxisLabel: 'Probability of choosing mother brands > 50% of the time',
    xLabels: ['<$25k', '$50–74k','$75–99k', '$100–149k', '$150k+']
  },
  {
    id: 'income-75-a',
    title: 'Predicted margins by income (>75% mother brand)',
    xAxisLabel: 'Income',
    yAxisLabel: 'Probability of choosing mother brands > 75% of the time',
    xLabels: ['<$25k', '$50–74k','$75–99k', '$100–149k', '$150k+']
  },
  {
    id: 'agegroup-50-b',
    title: 'Predicted margins by income (>50% mother brand)',
    xAxisLabel: 'Age Group',
    yAxisLabel: 'Probability of choosing mother brands > 50% of the time',
    xLabels: ['21-24', '25-34', '35-44', '45-54', '55-65', '65+']
  },
  {
    id: 'agegroup-75-b',
    title: 'Predicted margins by income (>75% mother brand)',
    xAxisLabel: 'Age Group',
    yAxisLabel: 'Probability of choosing mother brands > 75% of the time',
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
  { variable: 'Brand Importance Rating', coefficient: '0.66', oddsRatio: '1.93', pValue: '0.000 ***' },
  { variable: 'Importance of Availability', coefficient: '0.58', oddsRatio: '1.78', pValue: '0.012 **' },
  { variable: 'Importance of Variety', coefficient: '-0.39', oddsRatio: '0.67', pValue: '0.044 **' },
  { variable: "Famliarity with O'Doul's", coefficient: '-0.25', oddsRatio: '0.77', pValue: '0.056 *' },
  { variable: 'Familiarity with Budweiser', coefficient: '0.5', oddsRatio: '1.65', pValue: '0.072 *' },
];

const StandardLogisticRegressionSection = () => (
  <div className="space-y-8">
    <Card>
      <p className="text-xs uppercase tracking-wide text-slate-500">Standard logistic regression analysis</p>
      <div className="mt-4 grid gap-4 text-sm text-slate-600">
        <p>
            This section presents the predictive margins derived from the regression models used
            to examine how key demographic factors shape the likelihood of participants
            choosing mother brands above the two established thresholds (50 & 75%) across the entirety of the study.
            The figures report predicted probabilities
            with 95% confidence intervals, disaggregated by gender, allowing direct visual
            comparison across activity level, age group, and income. Together, these results
            provide a structured view of how decision-making tendencies vary across subpopulations
            and where gender differences are most pronounced or minimal. The aim is to clarify not
            only the central tendencies but also the uncertainty around these estimates, enabling a
            more precise assessment of demographic patterns that may influence strategic choice behavior.

        </p>
      </div>
    </Card>




      <Card>
          <div className="flex flex-col gap-3">
              <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Variables Selection criteria</p>
                  <p className="mt-1 text-sm text-slate-600">
                      The construction of this logistic regression model did not include any independent variables that
                      did not significantly influence the likelihood of mother brand choices above the 50 and 70% thresholds (the dependent variables).
                      The independent variables that were gathered throughout the study were demographic characteristics (age, income, activity level),
                      alcohol consumption frequency, and familiarity with brands.
                  </p>
              </div>
              <div>
                  <p className="mt-1 text-sm text-slate-600">
                      Across the study, participants were asked to rate how important it was for them to consume beer produced by a recognized brand on
                      a scale from 1 (not at all important) to 5 (very important).
                      This variable was one of the most important predictors of mother brand choice, with a significant p-value of 0.000 *** indicating that
                      it had a very stong impact.
                  </p>
              </div>
              <div>
                  <p className="mt-1 text-sm text-slate-600">
                      On the other hand, the majority of variables were not significant at the 5% level,
                      indicating that they did not significantly influence paritcipant choice behavior and thus did not enhance
                      the predictive power of the model.
                  </p>
              </div>
              <div className="overflow-x-auto">
                  <p className="text-sm text-slate-700">
                      The following are the variables included in the logistic regression model:
                  </p>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Dependent variables:
                  </p>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                      <li>
                          A binary variable equal to 1 if the consumer chose the mother brand in more than 50% of the
                          scenarios, and 0 otherwise
                      </li>
                      <li>
                          A binary variable equal to 1 if the consumer chose the mother brand in more than 75% of the
                          scenarios, and 0 otherwise
                      </li>
                  </ol>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Independent variables:
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                      We included all the relevant explanatory variables such as:
                  </p>

                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                      <li>Alcohol Consumption Frequency</li>
                      <li>Brand Importance Rating</li>
                      <li>Likelihood to Switch to Non-Alcoholic</li>
                      <li>Belief that 0.0 Beer Tastes as Good as Regular Beer</li>
                      <li>Expected Taste of Heineken 0.0</li>
                      <li>Perceived Trustworthiness of Heineken</li>
                      <li>Perceived Quality of Heineken</li>
                      <li>Importance of Availability</li>
                      <li>Importance of Variety</li>
                      <li>Importance of Health Consideration</li>
                      <li>Importance of Taste</li>
                      <li>Importance of Price</li>
                      <li>Importance of Purchasing from Trusted Brands</li>
                      <li>Familiarity with O’Doul’s</li>
                      <li>Familiarity with Clear Hops</li>
                      <li>Familiarity with Budweiser</li>
                      <li>Familiarity with Rescue Club</li>
                      <li>Familiarity with Heineken</li>
                  </ul>

              </div>
          </div>
      </Card>

      <Card>
          <div className="flex flex-col gap-3">
              <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Model coefficients</p>
                  <p className="mt-1 text-sm text-slate-600">
                      The table below shows the regression results for those varibales that were statistically significant.
                  </p>
              </div>
              <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                      <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                          <th className="px-3 py-2 text-left">Variable</th>
                          <th className="px-3 py-2 text-center">Coefficient</th>
                          <th className="px-3 py-2 text-center">Odds Ratio</th>
                          <th className="px-3 py-2 text-center">p-value</th>
                      </tr>
                      </thead>
                      <tbody>
                      {coefficientRows.map((row) => (
                          <tr key={row.variable} className="border-t border-slate-200">
                              <td className="px-3 py-2 text-left text-slate-700">{row.variable}</td>
                              <td className="px-3 py-2 text-center text-slate-600">{row.coefficient}</td>
                              <td className="px-3 py-2 text-center text-slate-600">{row.oddsRatio}</td>
                              <td className="px-3 py-2 text-center text-slate-600">{row.pValue}</td>
                          </tr>
                      ))}
                      </tbody>
                  </table>

                  <div className="mt-2 text-sm text-slate-600">
                The odds ratio shows how a one-unit increase in a variable changes the likelihood of the outcome:
                values above 1 indicate higher odds, values below 1 indicate lower odds, and values near 1 indicate little or no effect.
            </div>
            <div className="mt-2 text-sm text-slate-600">
                <BulletList items={
                    ['For a one-unit increase in the brand importance rating, the odds of a consumer choosing the mother brand are 1.93 times higher.',
                        'For a one-unit increase in the brand availability importance, the odds of a consumer choosing the mother brand are 1.78 times higher.',
                        'For a one-unit increase in the brand variety importance, the odds of a consumer choosing the mother brand are 0.67 times lower.',
                        "For a one-unit increase in the familiarity with O'Doul's rating, the odds of a consumer choosing the mother brand are 0.77 times lower.",
                        'For a one-unit increase in the familiarity with Budweiser importance rating, the odds of a consumer choosing the mother brand are 1.65 times higher.']
                }/>
            </div>
        </div>
      </div>
    </Card>

    <Card>
      <p className="text-xs uppercase tracking-wide text-slate-500">Note</p>
      <div className="mt-3 grid gap-2 text-sm text-slate-600">
        <p>
          <p>The lower the p value, the more significant the variable becomes for the predictive capabilities of the model</p>
          *** <em>p</em> &lt; 0.01,
          ** <em>p</em> &lt; 0.05,
          * <em>p</em> &lt; 0.10
        </p>


      </div>
    </Card>

      <Card>
          <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Interpretation</p>
              <p className="mt-1 text-sm text-slate-600">
                  The charts below show the predicted probability of the dependant variable being true, this meaning that a respondent
                  chooses mother brands in more than 50 or 75% of
                  their selections, broken down by activity level, income level, age group, and gender. The x-axis lists the activity categories,
                  and the y-axis shows the probability, from 0 to 1 (or 0% to 100%). Each point represents the estimated
                  probability for that group, while the vertical bars indicate the 95% confidence interval around that estimate.
                  For example, a male with a basic activity level has a predicted probability of approximately 50% of
                  choosing mother brands more than half the time. The lines allow comparison between males and females at
                  each activity level, and larger gaps between the points indicate stronger differences in predicted behavior.

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
  </div>
);

export default StandardLogisticRegressionSection;

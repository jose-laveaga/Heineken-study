import { useState } from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Accordion from '../components/ui/Accordion';
import Tabs from '../components/ui/Tabs';
import MethodTimeline from '../components/content/MethodTimeline';
import ExperimentStepper from '../components/content/ExperimentStepper';
import GlossarySection from '../components/content/GlossarySection';
import ResultsExplorer from '../components/explorers/ResultsExplorer';
import DemographicsSection from '../components/explorers/DemographicsSection';
import StandardLogisticRegressionSection from '../components/explorers/StandardLogisticRegressionSection';
import SentimentSection from '../components/sentiment/SentimentSection';
import DiscrepanciesSection from '../components/results/DiscrepanciesSection';
import ConclusionSection from '../components/results/ConclusionSection';
import AppendixSection from '../components/results/AppendixSection';
import GroupedBarChart from '../components/charts/GroupedBarChart';
import ThresholdLineChart from '../components/charts/ThresholdLineChart';
import ChartCard from '../components/charts/ChartCard';
import reportMeta from '../data/reportMeta.json';
import narrative from '../data/narrative.json';
import studyDesign from '../data/studyDesign.json';
import motherBrandPickRate from '../data/motherBrandPickRate.json';
import heinekenPickRate from '../data/heinekenPickRate.json';

export const reportSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'study-design', label: 'Study Design' },
  { id: 'experiment-flow', label: 'Experiment Flow' },
  { id: 'demographics', label: 'Demographics' },
  { id: 'results', label: 'Results' },
  { id: 'pick-rate-comparison', label: 'Pick Rate Comparison' },
  { id: 'standard-logistic-regression', label: 'Standard Logistic Regression Analysis' },
  { id: 'sentiment', label: 'Sentiment' },
  { id: 'discrepancies', label: 'Discrepancies' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'appendix', label: 'Appendix' },
  { id: 'glossary', label: 'Glossary' }
];

const ReportPage = () => {
  const researchCards = [
    {
      id: 'context',
      title: 'Context',
      content: (
        <ul className="space-y-2 text-sm text-slate-600">
          {narrative.context.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    },
    {
      id: 'research-questions',
      title: 'Research questions',
      content: (
        <ul className="space-y-2 text-sm text-slate-600">
          {narrative.researchQuestions.map((question) => (
            <li key={question.id}>
              <span className="font-semibold text-slate-700">{question.id}:</span> {question.text}
            </li>
          ))}
        </ul>
      )
    },
    {
      id: 'hypotheses',
      title: 'Hypotheses',
      content: (
        <ul className="space-y-2 text-sm text-slate-600">
          {narrative.hypotheses.map((hypothesis) => (
            <li key={hypothesis.id}>
              <span className="font-semibold text-slate-700">{hypothesis.id}:</span> {hypothesis.text}
            </li>
          ))}
        </ul>
      )
    }
  ];
  const [motherBrandView, setMotherBrandView] = useState('gender');
  const [heinekenView, setHeinekenView] = useState('gender');
  const pickRateTabs = [
    { id: 'gender', label: 'Gender' },
    { id: 'age', label: 'Age group' },
    { id: 'income', label: 'Income level' },
    { id: 'activity', label: 'Activity level' }
  ];

  return (
    <>
      <Section id="overview" title={reportMeta.title} subtitle={`${reportMeta.subtitle} • ${reportMeta.date}`}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-slate-900">Sustainable Sips – MIT x Heineken Report 2025</h1>
            <p className="text-sm text-slate-600">{narrative.abstract}</p>

          </div>
          <div className="space-y-4">
            <div className="grid gap-4">
                <StatCard label="Sample Size" value="n = 412" note="" />
                <StatCard label="Completion time" value="6-8 min" note="Median estimate" />
                <StatCard label="Geography" value="US only" note="" />
            </div>

          </div>
        </div>
      </Section>

      <Section id="study-design" title="Study design" subtitle="Context, research questions, and hypotheses">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <Accordion items={researchCards} />
          </div>
          <Card className="col-span-full w-full">
            <p className="text-xs uppercase tracking-wide text-slate-500">Five-step timeline</p>
            <div className="mt-4">
              <MethodTimeline stages={studyDesign.stages} />
            </div>
              <div className="mt-4">
                  <p className="text-xs tracking-wide text-slate900">Note: Please refer to the methodology page for more details</p>
              </div>
          </Card>
        </div>
      </Section>

      <Section id="experiment-flow" title="Experiment flow" subtitle="How participants moved through the study">
        <ExperimentStepper
          steps={studyDesign.experimentFlow.map((flow) => ({
            title: flow.title,
            bullets: flow.bullets
          }))}
        />

      </Section>

      <Section id="demographics" title="Demographics" subtitle="Participant distribution across key characteristics">
        <DemographicsSection />
    </Section>


      <Section
          id="results"
          title="Results"
          subtitle="Explore preference shares across 1v1 and multi-brand tasks"
      >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
              <table className="w-full max-w-md text-sm lg:w-auto">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                      <th className="px-3 py-2 text-left">p&nbsp;value</th>
                      <th className="px-3 py-2 text-center">significance</th>
                      <th className="px-3 py-2 text-left">code</th>
                  </tr>
                  </thead>

                  <tbody>
                  <tr className="border-t border-slate-200">
                      <td className="px-3 py-2 text-left text-slate-700">&lt;&nbsp;0.001</td>
                      <td className="px-3 py-2 text-center text-slate-600">Very&nbsp;High</td>
                      <td className="px-3 py-2 text-center text-slate-600">
            <span className="inline-flex items-center justify-center">
              <span className="h-3 w-3 rounded-sm bg-blue-200 ring-1 ring-blue-400" />
            </span>
                      </td>
                  </tr>

                  <tr className="border-t border-slate-200">
                      <td className="px-3 py-2 text-left text-slate-700">&lt;&nbsp;0.01</td>
                      <td className="px-3 py-2 text-center text-slate-600">High</td>
                      <td className="px-3 py-2 text-center text-slate-600">
            <span className="inline-flex items-center justify-center">
              <span className="h-3 w-3 rounded-sm bg-blue-50 ring-1 ring-blue-200" />
            </span>
                      </td>
                  </tr>

                  <tr className="border-t border-slate-200">
                      <td className="px-3 py-2 text-left text-slate-700">&lt;&nbsp;0.1</td>
                      <td className="px-3 py-2 text-center text-slate-600">Moderate</td>
                      <td className="px-3 py-2 text-center text-slate-600">
            <span className="inline-flex items-center justify-center">
              <span className="h-3 w-3 rounded-sm bg-amber-50 ring-1 ring-amber-200" />
            </span>
                      </td>
                  </tr>

                  <tr className="border-t border-slate-200">
                      <td className="px-3 py-2 text-left text-slate-700">&gt;&nbsp;0.1</td>
                      <td className="px-3 py-2 text-center text-slate-600">Low</td>
                      <td className="px-3 py-2 text-center text-slate-600">
            <span className="inline-flex items-center justify-center">
              <span className="h-3 w-3 rounded-sm bg-slate-50 ring-1 ring-slate-200" />
            </span>
                      </td>
                  </tr>
                  </tbody>
              </table>

              <p className="mt-2 text-sm text-slate-600 leading-relaxed tracking-wide ">
                  The charts below show the share of choices for each brand across each scenario performed in the study,
                  while the p-values indicate how likely it would have been that the results from these comparisons are the product of random
                  chance and not a real difference between participants' preferences. A very high or high significance
                  (p&nbsp;&lt;&nbsp;0.001 or p&nbsp;&lt;&nbsp;0.01) means the gap between brands is very unlikely to be due to chance and reflects
                  a strong, reliable preference. A moderate significance (p&nbsp;&lt;&nbsp;0.1) suggests some evidence of a real difference,
                  but the result should be interpreted with caution. A low significance (p&nbsp;&gt;&nbsp;0.1) indicates that the observed
                  gap could easily be random variation, so no clear preference between the brands can be confidently concluded.
              </p>
          </div>



      <ResultsExplorer />
      </Section>

      <Section
        id="pick-rate-comparison"
        title="Pick rate comparison"
        subtitle="Mother brand vs Heineken 0.0 threshold-based pick rates"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Mother brand</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Pick rate by segment</h3>
            </div>
            <Tabs options={pickRateTabs} value={motherBrandView} onChange={setMotherBrandView} />
            {motherBrandView === 'gender' && (
              <ChartCard title="Pick rate by gender">
                <GroupedBarChart
                  data={motherBrandPickRate.gender}
                  series={motherBrandPickRate.thresholds}
                  ariaLabel="Mother brand pick rate by gender"
                />
              </ChartCard>
            )}
            {motherBrandView === 'age' && (
              <ChartCard title="Pick rate by age group">
                <ThresholdLineChart
                  data={motherBrandPickRate.ageGroups}
                  series={motherBrandPickRate.thresholds}
                  xAxisLabel="Age group"
                  yAxisLabel="Pick rate (% of respondents)"
                  ariaLabel="Mother brand pick rate by age group"
                />
              </ChartCard>
            )}
            {motherBrandView === 'income' && (
              <ChartCard title="Pick rate by income group">
                <ThresholdLineChart
                  data={motherBrandPickRate.incomeGroups}
                  series={motherBrandPickRate.thresholds}
                  xAxisLabel="Income group"
                  yAxisLabel="Pick rate (% of respondents)"
                  ariaLabel="Mother brand pick rate by income group"
                />
              </ChartCard>
            )}
            {motherBrandView === 'activity' && (
              <ChartCard title="Pick rate by activity level">
                <ThresholdLineChart
                  data={motherBrandPickRate.activityLevels}
                  series={motherBrandPickRate.thresholds}
                  xAxisLabel="Activity level"
                  yAxisLabel="Pick rate (% of respondents)"
                  ariaLabel="Mother brand pick rate by activity level"
                />
              </ChartCard>
            )}
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Heineken 0.0</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Pick rate by segment</h3>
            </div>
            <Tabs options={pickRateTabs} value={heinekenView} onChange={setHeinekenView} />
            {heinekenView === 'gender' && (
              <ChartCard title="Pick rate by gender">
                <GroupedBarChart
                  data={heinekenPickRate.gender}
                  series={heinekenPickRate.thresholds}
                  ariaLabel="Heineken 0.0 pick rate by gender"
                />
              </ChartCard>
            )}
            {heinekenView === 'age' && (
              <ChartCard title="Pick rate by age group">
                <ThresholdLineChart
                  data={heinekenPickRate.ageGroups}
                  series={heinekenPickRate.thresholds}
                  xAxisLabel="Age group"
                  yAxisLabel="Pick rate (% of respondents)"
                  ariaLabel="Heineken 0.0 pick rate by age group"
                />
              </ChartCard>
            )}
            {heinekenView === 'income' && (
              <ChartCard title="Pick rate by income group">
                <ThresholdLineChart
                  data={heinekenPickRate.incomeGroups}
                  series={heinekenPickRate.thresholds}
                  xAxisLabel="Income group"
                  yAxisLabel="Pick rate (% of respondents)"
                  ariaLabel="Heineken 0.0 pick rate by income group"
                />
              </ChartCard>
            )}
            {heinekenView === 'activity' && (
              <ChartCard title="Pick rate by activity level">
                <ThresholdLineChart
                  data={heinekenPickRate.activityLevels}
                  series={heinekenPickRate.thresholds}
                  xAxisLabel="Activity level"
                  yAxisLabel="Pick rate (% of respondents)"
                  ariaLabel="Heineken 0.0 pick rate by activity level"
                />
              </ChartCard>
            )}
          </div>
        </div>
      </Section>

      <Section
        id="standard-logistic-regression"
        title="Standard Logistic Regression Analysis"
        subtitle="Predicted margins and coefficients from the standard model"
      >
        <StandardLogisticRegressionSection />
      </Section>

      <Section
        id="sentiment"
        title="Sentiment Analysis (Text Responses and Reasoning)"
        subtitle="Method, metrics, and brand sentiment insights"
      >
        <SentimentSection />
      </Section>

      <DiscrepanciesSection />
      <ConclusionSection />
      <AppendixSection />
      <GlossarySection />
    </>
  );
};

export default ReportPage;

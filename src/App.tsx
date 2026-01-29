import AppShell from './components/layout/AppShell';
import Header from './components/layout/Header';
import Toc from './components/layout/Toc';
import Section from './components/ui/Section';
import Card from './components/ui/Card';
import StatCard from './components/ui/StatCard';
import Callout from './components/ui/Callout';
import Accordion from './components/ui/Accordion';
import KeyTakeaways from './components/content/KeyTakeaways';
import MethodTimeline from './components/content/MethodTimeline';
import ExperimentStepper from './components/content/ExperimentStepper';
import ResultsExplorer from './components/explorers/ResultsExplorer';
import DemographicsSection from './components/explorers/DemographicsSection';
import StandardLogisticRegressionSection from './components/explorers/StandardLogisticRegressionSection';
import DataTable from './components/charts/DataTable';
import ThemeList from './components/content/ThemeList';
import QuoteCarousel from './components/content/QuoteCarousel';
import ChartCard from './components/charts/ChartCard';
import GroupedBarChart from './components/charts/GroupedBarChart';
import ThresholdLineChart from './components/charts/ThresholdLineChart';
import StackedBarChart from './components/charts/StackedBarChart';
import DonutChart from './components/charts/DonutChart';
import reportMeta from './data/reportMeta.json';
import narrative from './data/narrative.json';
import studyDesign from './data/studyDesign.json';
import sentiment from './data/sentiment.json';
import discrepancies from './data/discrepancies.json';
import motherBrandPickRate from './data/motherBrandPickRate.json';
import heinekenPickRate from './data/heinekenPickRate.json';

// TODO: Replace placeholder figures in /src/data/*.json with the final report numbers.

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'study-design', label: 'Study Design' },
  { id: 'experiment-flow', label: 'Experiment Flow' },
  { id: 'results', label: 'Results' },
  { id: 'mother-brand-pick-rate', label: 'Mother Brand Pick Rate' },
  { id: 'heineken-pick-rate', label: 'Heineken 0.0 Pick Rate' },
  { id: 'demographics', label: 'Demographics' },
  { id: 'standard-logistic-regression', label: 'Standard Logistic Regression Analysis' },
  { id: 'sentiment', label: 'Sentiment' },
  { id: 'discrepancies', label: 'Discrepancies' },
  { id: 'methods', label: 'Methods / Appendix' }
];

const App = () => {
  const researchCards = [
    {
      id: 'context',
      title: 'Context',
      content: (
        <ul className="space-y-2 text-sm text-slate-600">
          {narrative.context.map((item) => (
            <li key={item}>• {item}</li>
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

  return (
    <div className="bg-slate-50 text-slate-900">
      <Header sections={sections} pdfPath={reportMeta.pdfPath} />
      <AppShell>
        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_220px]">
          <div className="grid gap-10">
            <Section
              id="overview"
              title={reportMeta.title}
              subtitle={`${reportMeta.subtitle} • ${reportMeta.date}`}
            >
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <h1 className="text-3xl font-semibold text-slate-900">
                    Sustainable Sips – MIT x Heineken Report 2025
                  </h1>
                  <p className="text-sm text-slate-600">{narrative.abstract}</p>
                  <Card>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Key takeaways</p>
                    <div className="mt-4">
                      <KeyTakeaways items={narrative.keyTakeaways} />
                    </div>
                  </Card>
                </div>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <StatCard label="Sample size" value="n = 412" note="TODO: Update with final sample" />
                    <StatCard label="Completion time" value="14–16 min" note="Median estimate" />
                    <StatCard label="Geography" value="US only" note="Urban + suburban" />
                    <StatCard label="Main outcome" value="Heineken leads in 1v1" note="TODO: Update with final outcome" />
                  </div>
                  <Callout variant="note" title="At a glance">
                    The study highlights where sustainability cues boost selection and where pricing weakens the advantage.
                  </Callout>
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

            <Section
              id="results"
              title="Results"
              subtitle="Explore preference shares across 1v1 and multi-brand tasks"
            >
              <ResultsExplorer />
            </Section>

            <Section
              id="mother-brand-pick-rate"
              title="Mother brand pick rate"
              subtitle="Threshold-based pick rate across audience segments"
            >
              <div className="space-y-6">
                <ChartCard title="Pick rate by gender">
                  <GroupedBarChart
                    data={motherBrandPickRate.gender}
                    series={motherBrandPickRate.thresholds}
                    ariaLabel="Mother brand pick rate by gender"
                  />
                </ChartCard>
                <div className="grid gap-6 lg:grid-cols-3">
                  <ChartCard title="Pick rate by age group">
                    <ThresholdLineChart
                      data={motherBrandPickRate.ageGroups}
                      series={motherBrandPickRate.thresholds}
                      xAxisLabel="Age group"
                      yAxisLabel="Pick rate (% of respondents)"
                      ariaLabel="Mother brand pick rate by age group"
                    />
                  </ChartCard>
                  <ChartCard title="Pick rate by income group">
                    <ThresholdLineChart
                      data={motherBrandPickRate.incomeGroups}
                      series={motherBrandPickRate.thresholds}
                      xAxisLabel="Income group"
                      yAxisLabel="Pick rate (% of respondents)"
                      ariaLabel="Mother brand pick rate by income group"
                    />
                  </ChartCard>
                  <ChartCard title="Pick rate by activity level">
                    <ThresholdLineChart
                      data={motherBrandPickRate.activityLevels}
                      series={motherBrandPickRate.thresholds}
                      xAxisLabel="Activity level"
                      yAxisLabel="Pick rate (% of respondents)"
                      ariaLabel="Mother brand pick rate by activity level"
                    />
                  </ChartCard>
                </div>
              </div>
            </Section>

            <Section
              id="heineken-pick-rate"
              title="Heineken 0.0 pick rate"
              subtitle="Threshold-based pick rate across audience segments"
            >
              <div className="space-y-6">
                <ChartCard title="Pick rate by gender">
                  <GroupedBarChart
                    data={heinekenPickRate.gender}
                    series={heinekenPickRate.thresholds}
                    ariaLabel="Heineken 0.0 pick rate by gender"
                  />
                </ChartCard>
                <div className="grid gap-6 lg:grid-cols-3">
                  <ChartCard title="Pick rate by age group">
                    <ThresholdLineChart
                      data={heinekenPickRate.ageGroups}
                      series={heinekenPickRate.thresholds}
                      xAxisLabel="Age group"
                      yAxisLabel="Pick rate (% of respondents)"
                      ariaLabel="Heineken 0.0 pick rate by age group"
                    />
                  </ChartCard>
                  <ChartCard title="Pick rate by income group">
                    <ThresholdLineChart
                      data={heinekenPickRate.incomeGroups}
                      series={heinekenPickRate.thresholds}
                      xAxisLabel="Income group"
                      yAxisLabel="Pick rate (% of respondents)"
                      ariaLabel="Heineken 0.0 pick rate by income group"
                    />
                  </ChartCard>
                  <ChartCard title="Pick rate by activity level">
                    <ThresholdLineChart
                      data={heinekenPickRate.activityLevels}
                      series={heinekenPickRate.thresholds}
                      xAxisLabel="Activity level"
                      yAxisLabel="Pick rate (% of respondents)"
                      ariaLabel="Heineken 0.0 pick rate by activity level"
                    />
                  </ChartCard>
                </div>
              </div>
            </Section>

            <Section
              id="demographics"
              title="Demographics"
              subtitle="Participant distribution across key audience characteristics"
            >
              <DemographicsSection />
            </Section>

            <Section
              id="standard-logistic-regression"
              title="Standard Logistic Regression Analysis"
              subtitle="Predicted margins and coefficients from the standard model"
            >
              <StandardLogisticRegressionSection />
            </Section>

            <Section id="sentiment" title="Sentiment" subtitle="Brand sentiment metrics and qualitative drivers">
              <div className="space-y-8">
                <DataTable data={sentiment.table} />
                <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <div className="space-y-4">
                    <ThemeList title="Heineken drivers" items={sentiment.themes.drivers} />
                    <ThemeList title="Heineken barriers" items={sentiment.themes.barriers} />
                  </div>
                  <QuoteCarousel quotes={sentiment.quotes} />
                </div>
              </div>
            </Section>

            <Section
              id="discrepancies"
              title="Discrepancies"
              subtitle="Where intent diverges from forced choice"
            >
              <div className="space-y-6">
                {discrepancies.cases.map((item) => {
                  const dataTable = (
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          <th className="text-left font-semibold text-slate-600">Brand</th>
                          {item.likelihoodScale.map((value) => (
                            <th key={value} className="text-right font-semibold text-slate-600">
                              {value}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {item.likelihoodDistribution.map((entry) => (
                          <tr key={entry.label}>
                            <td className="py-1 text-left font-medium text-slate-700">{entry.label}</td>
                            {item.likelihoodScale.map((value) => (
                              <td key={value} className="py-1 text-right text-slate-600">
                                {entry.values[String(value)]}%
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );

                  return (
                    <div key={item.id} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
                      <div className="grid gap-6 lg:grid-cols-2">
                        <ChartCard title={`${item.title} — purchase likelihood`} dataTable={dataTable}>
                          <StackedBarChart
                            data={item.likelihoodDistribution}
                            keys={item.likelihoodScale.map(String)}
                            ariaLabel={`${item.title} purchase likelihood distribution`}
                          />
                        </ChartCard>
                        <ChartCard
                          title="Forced choice outcome"
                          interpretation={item.explanation}
                          dataTable={(
                            <table className="w-full">
                              <tbody>
                                {item.forcedChoice.map((choice) => (
                                  <tr key={choice.label} className="border-b border-slate-200 last:border-0">
                                    <td className="py-1 text-left font-medium text-slate-700">{choice.label}</td>
                                    <td className="py-1 text-right text-slate-600">{choice.value}%</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        >
                          <DonutChart data={item.forcedChoice} ariaLabel={`${item.title} forced choice chart`} />
                        </ChartCard>
                      </div>
                      <Callout variant="insight" title="Why this matters">
                        Preference gaps reveal where messaging must close the intent-to-choice gap in real shelf conditions.
                      </Callout>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section id="methods" title="Methods / Appendix" subtitle="Study methodology and definitions">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <Card>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Methodology</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li>• Online experiment with randomized task ordering.</li>
                    <li>• Quotas balanced for gender, age, and region.</li>
                    <li>• Analysis includes weighted pick rate averages.</li>
                    <li>• Sentiment collected via open-ended prompts.</li>
                  </ul>
                </Card>
                <Card>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Definitions</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li>• Mother brand: flagship brand evaluated across formats.</li>
                    <li>• Pick rate: share of respondents selecting a brand.</li>
                    <li>• Threshold: minimum pick rate to flag segment strength.</li>
                    <li>• Discrepancy: divergence between intent and forced choice.</li>
                  </ul>
                </Card>
              </div>
              <Card className="mt-6">
                <p className="text-xs uppercase tracking-wide text-slate-500">Study stages and outputs</p>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-3 py-2 text-left">Stage</th>
                        <th className="px-3 py-2 text-left">Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-200">
                        <td className="px-3 py-2">Design</td>
                        <td className="px-3 py-2">Experiment plan + stimuli</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-3 py-2">Pilot</td>
                        <td className="px-3 py-2">Timing + comprehension validation</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-3 py-2">Execution</td>
                        <td className="px-3 py-2">Field data + respondent metadata</td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="px-3 py-2">Analysis</td>
                        <td className="px-3 py-2">Preference models + segment outputs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </Section>
          </div>
          <Toc sections={sections} />
        </div>
      </AppShell>
    </div>
  );
};

export default App;

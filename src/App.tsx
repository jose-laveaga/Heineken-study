import { useState } from 'react';
import AppShell from './components/layout/AppShell';
import Header from './components/layout/Header';
import Toc from './components/layout/Toc';
import Section from './components/ui/Section';
import Card from './components/ui/Card';
import StatCard from './components/ui/StatCard';
import Callout from './components/ui/Callout';
import Accordion from './components/ui/Accordion';
import Tabs from './components/ui/Tabs';
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

const reportSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'study-design', label: 'Study Design' },
  { id: 'experiment-flow', label: 'Experiment Flow' },
  { id: 'results', label: 'Results' },
  { id: 'pick-rate-comparison', label: 'Pick Rate Comparison' },
  { id: 'demographics', label: 'Demographics' },
  { id: 'standard-logistic-regression', label: 'Standard Logistic Regression Analysis' },
  { id: 'sentiment', label: 'Sentiment' },
  { id: 'discrepancies', label: 'Discrepancies' },
  { id: 'methods', label: 'Methods / Appendix' }
];

const methodologySections = [
  { id: 'methodology-experiment-design', label: 'Experiment design' },
  { id: 'methodology-online-experiment', label: 'Online experiment' }
];

const pages = [
  { id: 'report', label: 'Report' },
  { id: 'methodology', label: 'Methodology' }
];

const App = () => {
  const [activePage, setActivePage] = useState('report');
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
  const [motherBrandView, setMotherBrandView] = useState('gender');
  const [heinekenView, setHeinekenView] = useState('gender');
  const pickRateTabs = [
    { id: 'gender', label: 'Gender' },
    { id: 'age', label: 'Age group' },
    { id: 'income', label: 'Income level' },
    { id: 'activity', label: 'Activity level' }
  ];
  const sections = activePage === 'report' ? reportSections : methodologySections;
  const handlePageChange = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <Header pages={pages} activePage={activePage} onPageChange={handlePageChange} pdfPath={reportMeta.pdfPath} />
      <AppShell>
        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_220px]">
          <div className="grid gap-10">
            {activePage === 'report' ? (
              <>
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
              </>
            ) : (
              <>
                <Section
                  id="methodology-experiment-design"
                  title="Experiment design"
                  subtitle="Design rationale, stimuli structure, and hypothesis framing"
                >
                  <div className="space-y-6">
                    <Card>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Design narrative</p>
                      <div className="mt-4 space-y-4 text-sm text-slate-600">
                        <p>
                          This section details the overarching experiment architecture, including the selection of
                          stimuli, the sequencing logic for tasks, and the guardrails used to ensure internal validity.
                          The narrative should explain why each stimulus was included, how it links to hypotheses, and
                          how the design mirrors realistic shelf decisions across contexts.
                        </p>
                        <p>
                          Provide space for describing the manipulations tested, the control conditions used, and the
                          rationale behind any counterbalancing or randomization logic. Expand on how the design
                          supports interpretation of sustainability cues versus price and familiarity signals.
                        </p>
                        <p>
                          Include a detailed explanation of the experiment flow, including any pilot adjustments,
                          timing considerations, and how the final stimuli set was refined to avoid fatigue while
                          maintaining statistical power.
                        </p>
                      </div>
                    </Card>
                    <div className="space-y-6">
                      <div className="space-y-4 text-sm text-slate-600">
                        <p>
                          Add a high-level visual summary of the experiment layout here. This image should highlight
                          the overall stimuli structure and the relationship between the test conditions.
                        </p>
                        <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                          Experiment design overview image placeholder
                        </div>
                      </div>
                      <div className="space-y-4 text-sm text-slate-600">
                        <p>
                          Use the next visuals to zoom into the core stimulus variants and how they appear in different
                          shelf contexts. These two images should be presented side by side and sized for easy
                          comparison.
                        </p>
                        <div className="grid gap-4 md:grid-cols-2">
                          {['Stimulus variant A', 'Stimulus variant B'].map((label) => (
                            <div
                              key={label}
                              className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500"
                            >
                              {label} image placeholder
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Section>

                <Section
                  id="methodology-online-experiment"
                  title="Online experiment"
                  subtitle="Survey flow, tasks, and in-survey stimuli"
                >
                  <div className="space-y-8">
                    {[
                      {
                        title: 'Entry and screening',
                        bullets: [
                          'Screening logic and eligibility criteria highlighted upfront.',
                          'Warm-up questions establish context before tasks begin.',
                          'Device checks ensure consistent visual exposure.'
                        ],
                        imageLabel: 'Entry + screening flow'
                      },
                      {
                        title: 'Core shelf tasks',
                        bullets: [
                          'Forced-choice shelves presented in randomized order.',
                          'Pricing and sustainability cues balanced across conditions.',
                          'Timers capture dwell time and speed-to-choice.'
                        ],
                        imageLabel: 'Shelf task flow'
                      },
                      {
                        title: 'Diagnostics and debrief',
                        bullets: [
                          'Open-ended prompts capture reasoning behind choices.',
                          'Attention checks confirm comprehension and focus.',
                          'Closing screen summarizes completion steps.'
                        ],
                        imageLabel: 'Diagnostics + debrief flow'
                      }
                    ].map((block) => (
                      <Card key={block.title}>
                        <p className="text-xs uppercase tracking-wide text-slate-500">{block.title}</p>
                        <div className="mt-4 space-y-4 text-sm text-slate-600">
                          <p>
                            Use this paragraph to expand on the flow for {block.title.toLowerCase()}, noting the
                            rationale for each step and how it supports the overall experiment objectives.
                          </p>
                          <ul className="space-y-2">
                            {block.bullets.map((bullet) => (
                              <li key={bullet}>• {bullet}</li>
                            ))}
                          </ul>
                          <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                            {block.imageLabel} image placeholder
                          </div>
                        </div>
                      </Card>
                    ))}
                    <div className="space-y-6">
                      <Card>
                        <p className="text-xs uppercase tracking-wide text-slate-500">Stimuli presentation variants</p>
                        <p className="mt-4 text-sm text-slate-600">
                          Add a concise explanation of how these views differ and why the layout supports clarity
                          during the task.
                        </p>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          {['Sequential layout', 'Grid layout'].map((label) => (
                            <div
                              key={label}
                              className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500"
                            >
                              {label} image placeholder
                            </div>
                          ))}
                        </div>
                      </Card>
                      <Card>
                        <p className="text-xs uppercase tracking-wide text-slate-500">Device-specific adjustments</p>
                        <p className="mt-4 text-sm text-slate-600">
                          Add a concise explanation of how these views differ and why the layout supports clarity
                          during the task.
                        </p>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          {['Desktop view', 'Mobile view'].map((label) => (
                            <div
                              key={label}
                              className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500"
                            >
                              {label} image placeholder
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                    <Card>
                      <p className="text-xs uppercase tracking-wide text-slate-500">Long-form notes</p>
                      <div className="mt-4 space-y-4 text-sm text-slate-600">
                        <p>
                          Reserve this space for a detailed narrative describing any additional online experiment
                          considerations, such as data quality safeguards, respondent incentives, or timing analysis.
                          This section should be large enough to capture extended notes and final methodology language.
                        </p>
                        <p>
                          Include details on data cleaning, exclusion criteria, and any adjustments made after launch.
                          Provide enough room to document the rationale behind those decisions.
                        </p>
                        <p>
                          Use the remainder of this space to outline future iterations, learnings from pilot runs, and
                          any recommended enhancements to the survey flow.
                        </p>
                      </div>
                    </Card>
                  </div>
                </Section>
              </>
            )}
          </div>
          <Toc sections={sections} />
        </div>
      </AppShell>
    </div>
  );
};

export default App;

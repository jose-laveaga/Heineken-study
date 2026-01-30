import Section from '../components/ui/Section';
import Card from '../components/ui/Card';

export const methodologySections = [
  { id: 'methodology-experiment-design', label: 'Experiment design' },
  { id: 'methodology-online-experiment', label: 'Online experiment' }
];

const MethodologyPage = () => (
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
              This section details the overarching experiment architecture, including the selection of stimuli, the
              sequencing logic for tasks, and the guardrails used to ensure internal validity. The narrative should
              explain why each stimulus was included, how it links to hypotheses, and how the design mirrors realistic
              shelf decisions across contexts.
            </p>
            <p>
              Provide space for describing the manipulations tested, the control conditions used, and the rationale
              behind any counterbalancing or randomization logic. Expand on how the design supports interpretation of
              sustainability cues versus price and familiarity signals.
            </p>
            <p>
              Include a detailed explanation of the experiment flow, including any pilot adjustments, timing
              considerations, and how the final stimuli set was refined to avoid fatigue while maintaining statistical
              power.
            </p>
          </div>
        </Card>
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-slate-600">
            <p>
              Add a high-level visual summary of the experiment layout here. This image should highlight the overall
              stimuli structure and the relationship between the test conditions.
            </p>
            <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              Experiment design overview image placeholder
            </div>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
            <p>
              Use the next visuals to zoom into the core stimulus variants and how they appear in different shelf
              contexts. These two images should be presented side by side and sized for easy comparison.
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
                Use this paragraph to expand on the flow for {block.title.toLowerCase()}, noting the rationale for each
                step and how it supports the overall experiment objectives.
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
              Add a concise explanation of how these views differ and why the layout supports clarity during the task.
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
              Add a concise explanation of how these views differ and why the layout supports clarity during the task.
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
              Reserve this space for a detailed narrative describing any additional online experiment considerations,
              such as data quality safeguards, respondent incentives, or timing analysis. This section should be large
              enough to capture extended notes and final methodology language.
            </p>
            <p>
              Include details on data cleaning, exclusion criteria, and any adjustments made after launch. Provide
              enough room to document the rationale behind those decisions.
            </p>
            <p>
              Use the remainder of this space to outline future iterations, learnings from pilot runs, and any
              recommended enhancements to the survey flow.
            </p>
          </div>
        </Card>
      </div>
    </Section>
  </>
);

export default MethodologyPage;

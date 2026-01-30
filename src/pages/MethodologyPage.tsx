import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import BulletList from "../components/content/BulletList";

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
              The study employs a within-subject design, where participants engage in a simulated online
              purchase environment featuring Heineken 0.0 and fictional non-branded 0.0 beer, non-fictional 0.0 beers.
              This approach enables a direct comparison of consumer choices and perceptions when presented with both
              branded and non-branded options simultaneously, thereby isolating the impact of branding on their
              preferences and purchase decisions. Using a fictional, non-branded 0.0 beer allows for a cleaner
              comparison with Heineken 0.0, isolating the impact of the established Heineken brand without
              introducing confounding variables. It ensures control over product attributes and avoids pre-existing
              perceptions associated with real brands. This approach provides flexibility and enables a focused
              analysis of the brand effect on consumer choices in the non-alcoholic beer market. The experimental
              design includes comparisons across multiple brand scenarios and price scenarios within a controlled
              simulated shopping environment.
            </p>
            <p>
                Brand Scenarios
                <BulletList items={
                    [
                        'Heineken vs Fictional Non-mother brand',
                        'Heineken vs Leading Non-mother Brand',
                        'Heineken vs Lesser-known Non-mother brands',
                        'Another mother brand (Budweiser) vs Fictional',
                        'Heineken vs All Non-mother brands',
                        'Mother brands vs Non-mother brands (aggregate comparison)'
                    ]}
                />
            </p>
            <p>
                Participants were exposed to several brand scenarios that compared Heineken 0.0 and other
                mother brands to fictional, leading, and lesser-known non-mother brand alternatives.
                In some cases, other major mother brands (including Budweiser and Beck’s Blue) were also
                included to broaden the analysis. Some of the Heineken comparisons were paired with price
                manipulations that positioned Heineken at equal, higher, or lower prices relative to a
                fictional option. This structure allowed us to observe whether brand equity
                continues to influence choice even when price disadvantages are present.
                Participants first completed detailed questions about demographics, lifestyle,
                and alcohol consumption habits. They then progressed to a set of structured brand
                choice tasks, which required them to select a preferred option when presented
                with multiple 0.0 beers. These tasks offered a controlled measure of preferences
                and the degree to which brand identity influenced them.
            </p>
            <p>
              The central component of the study was a simulated e-commerce environment
              modeled after a realistic online store. Participants could browse products,
              click on items, and add beers to their shopping carts.
            </p>
          </div>
        </Card>
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-slate-600">
              <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                  <img src="/src/images/Arctic-Fox-1-cropped.jpg" alt="Diagram of experiment layout" />
              </div>
              <p>
                This setup allowed the study to capture behavioral patterns rather than relying solely
                  on self-reported preferences. These behavioral logs are particularly valuable in u
                  nderstanding how consumers act when they are not consciously reflecting on their choices
                  but instead navigating an intuitive shopping interface.
                After completing the shopping task, participants answered follow-up questions on perceived
                  quality, purchase likelihood, familiarity with both mother brands and non-alcoholic alternatives,
                  and overall impressions of the products they had interacted with. These responses help contextualize the behavioral findings and provide insight into how consumers justify or interpret their choices.
                A total of around 400+ participants were recruited on Prolific to take part in the experiment, with
                  eligibility restricted to individuals residing in the United States. This sample features a diverse
                  distribution of age, gender, and drinking patterns, allowing for segmented analysis across different
                  consumer groups.
            </p>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
            <p>
                Choice of Brands
                The selection of competitor brands was a strategic decision made in collaboration with Heineken,
                designed to rigorously test the mother brand's equity against various market conditions.
                The chosen brands were evaluated based on two primary criteria: current market share performance
                and their role within the six defined comparison scenarios. The study featured major global mother
                brands, including Heineken, Budweiser, and Beck's Blue, to evaluate how their established reputation
                translated into the non-alcoholic segment. These were juxtaposed against real, established
                competitors, such as O'Doul's, as well as an independent brand, Rescue Club, to measure the
                influence of a not very famous non-mother brand. Finally, the inclusion of the two completely
                unknown fictional brands, Star Brew and Clear Hops 0.0, was essential to establish a
                zero-familiarity baseline and to isolate the premium value consumers placed on an established
                brand name alone. This mixed selection ensured the results provided both competitive intelligence
                and a robust understanding of brand trust transfer.
            </p>
            <p>
                Fictional Brands
                To compare the mother brand variants of can and bottle, two fictional brands were created.
                ClearHops 0.0 can and Star Brew Non-Alcoholic bottle.

                ClearHops 0.0 was intentionally created as a visually attractive but entirely
                unfamiliar non-mother brand, ensuring that respondents had no prior associations, loyalty,
                or expectations tied to it. This design allowed the brand to function as a neutral benchmark
                against which the strength of an established mother brand could be evaluated.
                Its primary analytical purpose was to test the elasticity of Heineken’s mother-brand
                equity under varying price conditions. By introducing systematic price manipulations for
                ClearHops 0.0, the experiment isolates whether consumers remain anchored to the trusted mother
                brand or are willing to substitute toward an unknown alternative when economic incentives change.
                This approach enables a clearer assessment of how resilient the mother brand’s perceived value is
                when faced with a lower-equity but visually credible competitor.
            </p>
              <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-20">
                      <img
                          src="/src/images/clearhops_solo.png"
                          alt="Image of ClearHops 0.0"
                          className="max-h-[400px] max-w-full object-contain"
                      />
                  </div>

                  <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-20">
                      <img
                          src="/src/images/heinekenbottle_solo.png"
                          alt="Image of Heineken 0.0"
                          className="max-h-[400px] max-w-full object-contain"
                      />
                  </div>
              </div>

          </div>
        </div>
      </div>
    </Section>

    <Section
      id="methodology-online-experiment"
      title="Online experiment"
      subtitle="This experiment is designed to collect comprehensive data on consumer preferences for non-alcoholic beer brands. The study uses a combination of demographic profiling, simulated shopping tasks (1v1 and multiple brand comparisons), and attitudinal questions to generate actionable consumer insights. The questionnaire is integrated with the Prolific platform for participant recruitment and tracking"
    >
      <div className="space-y-8">
        {[
          {
            title: 'Welcome Screen',
            description: 'The welcome screen is the first screen participants see when they launch the experiment.',
            bullets: [
              'A title: "Welcome to the Consumer Preference Study"',
              'A brief description explaining that they will answer questions about themselves, ' +
              'complete an online shopping task for non-alcoholic beers, and answer follow-up questions',
              'What to expect in the experiment'
            ],
            imageLabel: <img src="/src/images/welcome_screen.png" alt="Welcome screen" />
          },
          {
            title: 'Pre-experiment Questionnaire (Screening)',
            description: 'When participants arrive via Prolific URL with embedded parameters, their Prolific Participant ID, Study ID, and Session ID are automatically captured and displayed in a green confirmation box.',
            bullets: [
              'Forced-choice shelves presented in randomized order.',
              'Pricing and sustainability cues balanced across conditions.',
              'Timers capture dwell time and speed-to-choice.'
            ],
            imageLabel: <img src="/src/images/questions.png" alt="Pre-experiment questionnaire" />
          },
          {
            title: 'Pre-experiment Questionnaire (Demographics)',
            bullets: [
              'Age Group',
                'Gender',
                'Ethnicity',
                'Highest completed education level',
                'Personal Income (Annual)',
                'Activity Level (Days per week)'
            ],
            imageLabel: <img src="/src/images/demogrpahics_questions.png" alt="Pre-experiment questionnaire" />
          }
        ].map((block) => (
          <Card key={block.title}>
            <p className="text-xs uppercase tracking-wide text-slate-500">{block.title}</p>
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <p>
                  {block.description}
              </p>
              <ul className="space-y-2">
                {block.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
              <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-20 text-sm text-slate-500">
                {block.imageLabel}
              </div>
            </div>
          </Card>
        ))}
        <div className="space-y-6">
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">1v1 Brand Comparison Task</p>
              <p>
                  Participants enter a simulated shopping experience where they see pairs of non-alcoholic beer brands side by side. For each pair:
                  <BulletList items={[
                      'A prompt asks them to choose their preference (e.g., "Which would you add to your cart?")',
                      'Two beer product images are displayed with brand names.',
                      'Price Tags (when enabled): Some comparisons display price tags on each product to test price sensitivity',
                      'A shopping cart interface allows participants to add/remove selections',
                      'The "Continue" button advances to the next comparison'
                  ]}
                  />
              </p>
            <p>
                The experiment includes 13 fixed comparison slots organized as:

                  <BulletList items={[
                      'Regular Comparisons: Starndad side by side brand comparisons without price inforation',
                      'Price Comparisons: Comparisons with visible price tags to test price sensitivity',
                  ]}
                  />
            </p>

            <p>
              Insights
              <BulletList items={[
                  'Relative Brand Preference: Direct head-to-head comparisons reveal true preference hierarchies between competing brands',
                  'Price Sensitivity Analysis: Price-tagged comparisons quantify willingness to pay and price thresholds',
                  'Value Perception: Comparing selections with/without price reveals brand equity independent of price',
                  'Competitive Intelligence: Identifies which brands win or lose against specific competitors',
                  'Brand Position Mapping: Pattern of wins/losses across comparisons creates competitive positioning data'

                  ]}
              />
            </p>


              <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-20 p-4">
                      <div className="mb-3 text-sm text-slate-500"></div>
                      <img
                          src="/src/images/bottle_v_bottle.png"
                          alt="Sequential brand comparison layout"
                          className="max-h-[500px] max-w-full object-contain"
                      />
                  </div>

                  <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-20 p-4">
                      <div className="mb-3 text-sm text-slate-500"></div>
                      <img
                          src="/src/images/can_v_can_price.png"   // change to your actual file
                          alt="Grid brand comparison layout"
                          className="max-h-[500px] max-w-full object-contain"
                      />
                  </div>
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

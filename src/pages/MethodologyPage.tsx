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

              <div className="mt-4 space-y-6 text-sm text-slate-600">
                  <p>
                      The study employs a within-subject design, where participants engage in a simulated online purchase
                      environment featuring Heineken 0.0 and fictional non-branded 0.0 beer, as well as non-fictional 0.0 beers.
                      This approach enables a direct comparison of consumer choices and perceptions when presented with both
                      branded and non-branded options simultaneously, thereby isolating the impact of branding on preferences and
                      purchase decisions. Using a fictional, non-branded 0.0 beer allows for a cleaner comparison with Heineken 0.0,
                      isolating the impact of the established Heineken brand without introducing confounding variables. It ensures
                      control over product attributes and avoids pre-existing perceptions associated with real brands. This approach
                      provides flexibility and enables a focused analysis of the brand effect on consumer choices in the
                      non-alcoholic beer market. The experimental design includes comparisons across multiple brand scenarios and
                      price scenarios within a controlled simulated shopping environment.
                  </p>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Brand scenarios</p>
                      <div className="mt-3">
                          <BulletList
                              items={[
                                  "Heineken vs Fictional non-mother brand",
                                  "Heineken vs Leading non-mother brand",
                                  "Heineken vs Lesser-known non-mother brands",
                                  "Another mother brand (Budweiser) vs Fictional",
                                  "Heineken vs All non-mother brands",
                                  "Mother brands vs Non-mother brands (aggregate comparison)"
                              ]}
                          />
                      </div>
                  </div>

                  <p>
                      Participants were exposed to several brand scenarios that compared Heineken 0.0 and other mother brands to
                      fictional, leading, and lesser-known non-mother brand alternatives. In some cases, other major mother brands
                      (including Budweiser and Beck’s Blue) were also included to broaden the analysis. Some of the Heineken
                      comparisons were paired with price manipulations that positioned Heineken at equal, higher, or lower prices
                      relative to a fictional option. This structure allowed observation of whether brand equity continues to
                      influence choice even when price disadvantages are present.
                  </p>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Participant flow</p>
                      <div className="mt-3">
                          <BulletList
                              items={[
                                  "Demographics, lifestyle, and alcohol consumption module.",
                                  "Structured brand choice tasks across multiple 0.0 beer sets.",
                                  "Observed preferences and sensitivity to brand identity under controlled conditions."
                              ]}
                          />
                      </div>
                  </div>

                  <p>
                      The central component of the study was a simulated e-commerce environment modeled after a realistic online
                      store. Participants could browse products, click on items, and add beers to their shopping carts.
                  </p>
              </div>
          </Card>
        <div className="space-y-6">
          <div className="space-y-4 text-sm text-slate-600">
              <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                  <img src="/src/images/experiment_design.png" alt="Diagram of experiment layout" />
              </div>

              <div className="space-y-6 text-sm text-slate-600">
                  <p>
                      This setup allowed the study to capture behavioral patterns rather than relying solely on self-reported
                      preferences. Behavioral logs are particularly valuable for understanding how consumers act when they are not
                      consciously reflecting on their decisions but instead navigating an intuitive shopping interface.
                  </p>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Post-task measurement
                      </p>
                      <div className="mt-3">
                          <BulletList
                              items={[
                                  "Perceived product quality and overall impressions.",
                                  "Purchase likelihood for interacted brands.",
                                  "Familiarity with mother brands and non-alcoholic alternatives.",
                                  "Interpretive responses that contextualize observed behavioral choices."
                              ]}
                          />
                      </div>
                  </div>

                  <p>
                      A total of approximately 400+ participants were recruited via Prolific, with eligibility restricted to
                      individuals residing in the United States. The resulting sample spans a diverse distribution of age, gender,
                      and drinking patterns, enabling segmented analysis across multiple consumer groups.
                  </p>
              </div>

              <div className="mt-6 space-y-6 text-sm text-slate-600">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Choice of brands
                      </p>
                      <div className="mt-3">
                          <BulletList
                              items={[
                                  "Brand selection designed in collaboration with Heineken to rigorously test mother-brand equity.",
                                  "Brands evaluated based on market share relevance and role within six predefined comparison scenarios.",
                                  "Major global mother brands included: Heineken, Budweiser, and Beck’s Blue.",
                                  "Established non-mother competitors included: O’Doul’s and Rescue Club.",
                                  "Two fictional brands introduced to establish a zero-familiarity baseline and isolate pure brand equity."
                              ]}
                          />
                      </div>
                  </div>

                  <p>
                      This mixed brand selection ensured the study delivered both competitive intelligence and a robust assessment
                      of trust transfer from established alcoholic brands into the non-alcoholic category.
                  </p>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Fictional brands
                      </p>
                      <div className="mt-3">
                          <BulletList
                              items={[
                                  "Two fictional brands were created to compare can versus bottle formats: ClearHops 0.0 (can) and Star Brew Non-Alcoholic (bottle).",
                                  "ClearHops 0.0 was designed to be visually credible yet entirely unfamiliar, eliminating prior associations or loyalty.",
                                  "Serves as a neutral benchmark for evaluating the strength of established mother brands.",
                                  "Systematic price manipulations isolate the elasticity of Heineken’s mother-brand equity.",
                                  "Tests whether consumers substitute toward an unknown brand when economic incentives shift.",
                                  "Enables assessment of how resilient perceived mother-brand value remains under competitive pressure."
                              ]}
                          />
                      </div>
                  </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                      <img
                          src="/src/images/clearhops_solo.png"
                          alt="ClearHops 0.0"
                          className="max-h-[400px] max-w-full object-contain"
                      />
                  </div>

                  <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                      <img
                          src="/src/images/heinekenbottle_solo.png"
                          alt="Heineken 0.0"
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
        <div className="space-y-6">
            {/* Welcome Screen */}
            <Card>
                <p className="text-xs uppercase tracking-wide text-slate-500">Welcome screen</p>

                <div className="mt-4 space-y-4 text-sm text-slate-600">
                    <p>The welcome screen is the first screen participants see when they launch the experiment.</p>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Includes</p>
                        <div className="mt-3">
                            <BulletList
                                items={[
                                    <>A title: <span className="font-medium text-slate-800">“Welcome to the Consumer Preference Study”</span></>,
                                    "A brief description explaining that participants will answer questions about themselves, complete an online shopping task for non-alcoholic beers, and answer follow-up questions.",
                                    "A short “what to expect” preview of the experiment flow."
                                ]}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                        <img
                            src="/src/images/welcome_screen.png"
                            alt="Welcome screen"
                            className="max-h-[750px] w-full object-contain"
                        />
                    </div>
                </div>
            </Card>

            {/* Pre-experiment Questionnaire (Screening) */}
            <Card>
                <p className="text-xs uppercase tracking-wide text-slate-500">Pre-experiment questionnaire</p>

                <div className="mt-4 space-y-4 text-sm text-slate-600">
                    <p>
                        When participants arrive via the Prolific URL with embedded parameters, their Prolific Participant ID, Study
                        ID, and Session ID are automatically captured and displayed in a confirmation box.
                    </p>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Captured fields</p>
                        <div className="mt-3">
                            <BulletList
                                items={[
                                    "Prolific Participant ID",
                                    "Study ID",
                                    "Session ID"
                                ]}
                                className="text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                        <img
                            src="/src/images/questions.png"
                            alt="Screening questionnaire"
                            className="max-h-[750px] w-full object-contain"
                        />
                    </div>
                </div>
            </Card>

            {/* Pre-experiment Questionnaire (Demographics) */}
            <Card>
                <p className="text-xs uppercase tracking-wide text-slate-500">Demographics module</p>

                <div className="mt-4 space-y-4 text-sm text-slate-600">
                    <p>Participants then complete a short demographics module used for segmentation and subgroup analysis.</p>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Measures</p>
                        <div className="mt-3">
                            <BulletList
                                items={[
                                    "Age group",
                                    "Gender",
                                    "Ethnicity",
                                    "Highest completed education level",
                                    "Personal income (annual)",
                                    "Activity level (days per week)"
                                ]}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                        <img
                            src="/src/images/demogrpahics_questions.png"
                            alt="Demographics questionnaire"
                            className="max-h-[750px] w-full object-contain"
                        />
                    </div>
                </div>
            </Card>
        </div>

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
                  <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                      <div className="mb-3 text-sm text-slate-500"></div>
                      <img
                          src="/src/images/bottle_v_bottle.png"
                          alt="brand layout"
                          className="max-h-[500px] max-w-full object-contain"
                      />
                  </div>

                  <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                      <div className="mb-3 text-sm text-slate-500"></div>
                      <img
                          src="/src/images/can_v_can_price.png"
                          alt="comparison layout"
                          className="max-h-[500px] max-w-full object-contain"
                      />
                  </div>
              </div>
          </Card>
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">Device-specific adjustments</p>
            <p className="mt-4 text-sm text-slate-600">
              Multiple Brand Comparisons
            </p>
            <p>
                Participants view a set of six non-alcoholic beer products simultaneously and must select their preferred option.
                The experiment incorporates up to four multiple comparison sets, each featuring comparisons with various
                established mother brands, including Heineken, Budweiser, and Beck’s Blue.
                This methodology was implemented to accurately simulate real-time purchasing scenarios encountered in
                retail and online shopping environments.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <div className="mb-3 text-sm text-slate-500"></div>
                  <img
                      src="/src/images/multirand_cans.png"
                      alt="Sequential layout"
                      className="max-h-[750px] max-w-full object-contain"
                  />
              </div>
              <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <div className="mb-3 text-sm text-slate-500"></div>
                  <img
                      src="/src/images/multibrand_bottles.png"
                      alt="comparison layout"
                      className="max-h-[750px] max-w-full object-contain"
                  />
              </div>
                <p>
                    Insights
                    <BulletList items={[
                        'Choice Overload: Tests decision-making when faced with multiple options (more realistic shelf scenario)',
                        'Selection Criteria: Written explanations reveal the specific attributes driving choice (packaging, brand recognition, flavor expectations, etc.)',
                        'Qualitative Data: Open-ended responses provide rich context for quantitative preference data',
                        'Attribute Importance: Thematic analysis of reasons reveals which product attributes matter most',
                        'Unaided Recall: Participants articulate their own decision factors without prompting'
                    ]}
                    />
                </p>
            </div>
          </Card>
        </div>


          <Card>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                  Post-Experiment Questionnaire (Final Questions)
              </p>

              <div className="mt-4 space-y-8 text-sm text-slate-600">
                  {/* 5a */}
                  <div className="space-y-3">
                      <p className="font-semibold text-slate-800">Decision factor (open-ended)</p>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question</p>
                          <p className="italic text-slate-700">
                              “What was the biggest factor in your decision when choosing between the non-alcoholic beers?”
                          </p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Format</p>
                          <p>Open text area</p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                          <BulletList
                              items={[
                                  "Unaided attribute recall: captures what naturally comes to mind as important.",
                                  "Decision hierarchy: reveals primary vs. secondary decision factors.",
                                  "Language analysis: actual consumer language can inform marketing messaging."
                              ]}
                          />
                      </div>
                  </div>

                  <div className="border-t border-slate-200" />

                  {/* 5b */}
                  <div className="space-y-3">
                      <p className="font-semibold text-slate-800">Likelihood to switch / try</p>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question</p>
                          <p className="italic text-slate-700">
                              “How likely are you to [switch to/try] non-alcoholic beer?”
                          </p>
                          <p className="text-slate-500">
                              Wording adapts based on prior responses (non-drinkers see “try”, current drinkers see “switch to”).
                          </p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scale (1–5)</p>
                          <BulletList
                              items={[
                                  "1 = Very unlikely",
                                  "2 = Unlikely",
                                  "3 = Neutral",
                                  "4 = Likely",
                                  "5 = Very likely"
                              ]}
                          />
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                          <BulletList
                              items={[
                                  "Market potential: measures conversion likelihood for the non-alcoholic category.",
                                  "Segment comparison: compares switching intent across consumer segments.",
                                  "Barrier identification: low scores indicate a need to understand adoption barriers."
                              ]}
                          />
                      </div>
                  </div>

                  <div className="border-t border-slate-200" />

                  {/* 5c */}
                  <div className="space-y-3">
                      <p className="font-semibold text-slate-800">Importance factors</p>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question</p>
                          <p className="italic text-slate-700">
                              “How important would each of the following factors be in influencing your decision to [try/switch to]
                              non-alcoholic beer?”
                          </p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Factors rated</p>
                          <BulletList
                              items={[
                                  "Health and wellness considerations",
                                  "Taste similarity to alcoholic beer",
                                  "Trusted brand",
                                  "Price",
                                  "Variety",
                                  "Availability"
                              ]}
                          />
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scale (1–5)</p>
                          <BulletList items={["1 = Not at all important", "5 = Extremely important"]} />
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                          <BulletList
                              items={[
                                  "Driver prioritization: ranks which factors most influence adoption decisions.",
                                  "Segment differences: may reveal different priorities for different consumer groups.",
                                  "Marketing focus: identifies which benefits to emphasize in communications.",
                                  "Product development: guides R&D priorities (taste vs. price vs. variety)."
                              ]}
                          />
                      </div>
                  </div>

                  <div className="border-t border-slate-200" />

                  {/* 5d */}
                  <div className="space-y-3">
                      <p className="font-semibold text-slate-800">Mother brand importance</p>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question</p>
                          <p className="italic text-slate-700">
                              “When choosing a non-alcoholic beer, how important is it to you that it is produced by a well-known
                              established beer brand (the mother brand), rather than by a new or unfamiliar brand?”
                          </p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scale (1–5)</p>
                          <BulletList items={["1 = Not at all important", "5 = Extremely important"]} />
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                          <BulletList
                              items={[
                                  "Brand extension strategy: measures the value of established brand names in the non-alcoholic category.",
                                  "New entrant opportunity: low scores indicate openness to new/unfamiliar brands.",
                                  "Trust transfer: assesses whether reputation from alcoholic beers transfers to non-alcoholic variants."
                              ]}
                          />
                      </div>
                  </div>

                  <div className="border-t border-slate-200" />

                  {/* 5e */}
                  <div className="space-y-3">
                      <p className="font-semibold text-slate-800">Brand familiarity</p>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question</p>
                          <p className="italic text-slate-700">“Before today, how familiar were you with each brand?”</p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Brands rated</p>
                          <BulletList
                              items={[
                                  "Heineken 0.0",
                                  "Budweiser Zero",
                                  "O'Doul's Non Alc",
                                  "Clear Hops 0.0",
                                  "Rescue Club Non Alc",
                                  "Beck's Blue"
                              ]}
                          />
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scale (1–5)</p>
                          <BulletList items={["1 = Not at all familiar", "5 = Extremely familiar"]} />
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                          <BulletList
                              items={[
                                  "Brand awareness levels: measures current market awareness for each brand.",
                                  "Familiarity–preference correlation: tests if familiarity predicts choice in comparisons.",
                                  "Marketing effectiveness: indicates which brands have achieved awareness.",
                                  "Competitive benchmarking: compares established brands vs. newer entrants and fictional brands."
                              ]}
                          />
                      </div>
                  </div>

                  <div className="border-t border-slate-200" />

                  {/* 5f */}
                  <div className="space-y-3">
                      <p className="font-semibold text-slate-800">Attention check 1</p>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question</p>
                          <p className="italic text-slate-700">
                              “This question is intended for an attention check. Please select option 4.”
                          </p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Format</p>
                          <p>1–5 scale (correct answer: 4)</p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                          <BulletList
                              items={[
                                  "Data quality: identifies inattentive participants who may be clicking randomly.",
                                  "Response filtering: enables exclusion of low-quality responses from analysis."
                              ]}
                          />
                      </div>
                  </div>

                  <div className="border-t border-slate-200" />

                  {/* 5g */}
                  <div className="space-y-3">
                      <p className="font-semibold text-slate-800">Heineken ratings</p>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question</p>
                          <p className="italic text-slate-700">
                              “Please rate Heineken on the following parameters on a scale from 1–5:”
                          </p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Parameters</p>
                          <BulletList
                              items={[
                                  "Trustworthiness (1 = Not trustworthy at all, 5 = Very trustworthy)",
                                  "Perceived quality (1 = Low quality, 5 = High quality)",
                                  "Expected taste (1 = Very poor, 5 = Excellent)"
                              ]}
                          />
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                          <BulletList
                              items={[
                                  "Brand health metrics: tracks key brand equity dimensions for a major player.",
                                  "Quality perception: tests whether premium positioning transfers to non-alcoholic.",
                                  "Benchmark comparison: provides a reference point for other brands."
                              ]}
                          />
                      </div>
                  </div>

                  <div className="border-t border-slate-200" />

                  {/* 5h */}
                  <div className="space-y-3">
                      <p className="font-semibold text-slate-800">General attitudes (beer drinkers only)</p>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Statement</p>
                          <p className="italic text-slate-700">“Non-alcoholic beers can taste as good as regular beers.”</p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conditional display</p>
                          <p>Only shown to participants who indicated they drink beer.</p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scale (1–5)</p>
                          <BulletList items={["1 = Strongly disagree", "5 = Strongly agree"]} />
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                          <BulletList
                              items={[
                                  "Category belief: measures fundamental belief about non-alcoholic beer quality.",
                                  "Barrier identification: low agreement suggests taste skepticism as an adoption barrier.",
                                  "Segment comparison: compares attitudes between regular beer drinkers and others."
                              ]}
                          />
                      </div>
                  </div>

                  <div className="border-t border-slate-200" />

                  {/* 5i */}
                  <div className="space-y-3">
                      <p className="font-semibold text-slate-800">Attention check 2</p>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question</p>
                          <p className="italic text-slate-700">
                              “This question is intended for an attention check. Please select option 2.”
                          </p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Format</p>
                          <p>1–5 scale (correct answer: 2)</p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                          <BulletList
                              items={[
                                  "Sustained attention: tests whether participants stayed engaged throughout.",
                                  "Quality control: two checks provide more reliable response filtering."
                              ]}
                          />
                      </div>
                  </div>

                  <div className="border-t border-slate-200" />

                  {/* 5j */}
                  <div className="space-y-3">
                      <p className="font-semibold text-slate-800">Purchase likelihood</p>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question</p>
                          <p className="italic text-slate-700">
                              “How likely are you to buy each of the following non-alcoholic beers if they were available for purchase?”
                          </p>
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Brands rated</p>
                          <BulletList
                              items={[
                                  "Heineken 0.0",
                                  "Budweiser Zero",
                                  "O'Doul's Non Alc",
                                  "Clear Hops 0.0",
                                  "Rescue Club Non Alc",
                                  "Beck's Blue"
                              ]}
                          />
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scale (1–5)</p>
                          <BulletList items={["1 = Very unlikely", "5 = Very likely"]} />
                      </div>

                      <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Insights</p>
                          <BulletList
                              items={[
                                  "Purchase intent: direct measure of conversion potential by brand.",
                                  "Preference validation: tests if comparison choices align with stated purchase intent.",
                                  "Market share prediction: relative purchase likelihood indicates potential market share.",
                                  "Brand ranking: creates a preference hierarchy for strategic planning."
                              ]}
                          />
                      </div>
                  </div>
              </div>
          </Card>


    </Section>
  </>
);

export default MethodologyPage;

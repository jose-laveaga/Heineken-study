export type HypothesisOutcome = {
  id: 'H1' | 'H2' | 'H3';
  title: string;
  intent: string;
  outcome: 'supported' | 'not_supported';
  outcomeLabel: string;
  evidenceStrength: number;
  supportingText: string;
  figuresMentioned?: string[];
};

export const conclusionIntroParagraphs = [
  "The Sustainable Sips: MIT x Heineken Report 2025 focused on a critical strategic challenge: The trust transfer associated with a mother brand in the emerging non-alcoholic beverage category. The study's foundational premise is that an established brand name helps to reduce consumer uncertainty in a relatively unfamiliar market space, serving as a powerful signal of quality and reliability.",
  "The research design, which included direct comparisons against completely unknown fictional brands (like Clear Hops 0.0 and Star Brew), was explicitly structured to isolate and measure the premium value consumers place on an established mother brand alone. A core post-experiment question further tested this concept by directly asking participants how important it is that their non-alcoholic choice is produced by a ‘well-known established beer brand.’",
  'The central case study for this transfer of brand equity was Heineken.'
];

export const hypotheses: HypothesisOutcome[] = [
  {
    id: 'H1',
    title: 'Validate the Brand Advantage (H1)',
    intent:
      "To confirm whether Heineken 0.0 is chosen more frequently than non-branded alternatives, establishing a clear measure of the mother brand's unassisted preference advantage.",
    outcome: 'supported',
    outcomeLabel: 'Supported (retain null)',
    evidenceStrength: 95,
    supportingText:
      'As illustrated in Figures 44 and 45, Heineken 0.0 consistently outperformed two fictional comparator brands across seven distinct scenarios. The magnitude of the observed effects is substantial, resulting in an exceptionally high level of statistical significance and reinforcing the robustness of the conclusion.',
    figuresMentioned: ['44', '45']
  },
  {
    id: 'H2',
    title: 'Measure Trust Transfer (H2)',
    intent:
      'To determine if favorable brand perception scores for the Heineken alcoholic brand positively correlate with higher purchase likelihood for Heineken 0.0.',
    outcome: 'supported',
    outcomeLabel: 'Supported',
    evidenceStrength: 92,
    supportingText:
      'Figure 46 demonstrates a consistent and interpretable pattern across the experiment’s results. A clear relationship is observed between expected taste, expected quality, and level of familiarity, and the likelihood of purchasing Heineken 0.0. The strength of these relationships is supported by an exceptionally high level of statistical significance.',
    figuresMentioned: ['46']
  },
  {
    id: 'H3',
    title: 'Segment the Effect (H3)',
    intent:
      "To reveal if the brand's impact is stronger for regular alcohol drinkers—who may be more responsive to the familiar Heineken signal—compared to non-drinkers, who may rely more on other attributes.",
    outcome: 'not_supported',
    outcomeLabel: 'Not supported',
    evidenceStrength: 10,
    supportingText:
      'Comparative analysis between regular drinkers and non- to low-frequency drinkers identified no meaningful differences in brand choice. This consistency was observed across all individual comparisons as well as in the aggregated results. The findings yielded extremely low statistical significance, leading to the rejection of Hypothesis 3.'
  }
];

export const hypothesisOutcomeChartData = hypotheses.map((hypothesis) => ({
  label: hypothesis.id,
  value: hypothesis.evidenceStrength,
  outcome: hypothesis.outcome,
  outcomeLabel: hypothesis.outcomeLabel
}));

export const conclusionKeyTakeaway =
  'Mother-brand signals reliably drive preference and purchase likelihood, but the effect does not materially differ by drinking frequency.';

export const conclusionClosingParagraph =
  'In sum, the complete report provides the quantitative evidence necessary to assess the effectiveness of the mother brand strategy, offering Heineken actionable insights into marketing, product positioning, and understanding the consumer psychology that drives adoption within the zero-alcohol market.';

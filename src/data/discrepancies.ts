export type LikelihoodScore = 1 | 2 | 3 | 4 | 5;

export interface DiscrepancyFigure {
  id: string;
  caption: string;
  kind: 'likelihood' | 'choice';
  brands?: string[];
}

export interface LikelihoodChart {
  figureId: string;
  brandLabel: string;
  distribution: { score: LikelihoodScore; pct: number }[];
}

export interface ChoiceChart {
  figureId: string;
  kind: 'headToHead' | 'multiBrand';
  shares: { label: string; pct: number }[];
}

export interface DiscrepancyCase {
  id: string;
  title: string;
  figures: DiscrepancyFigure[];
  narrative: string[];
  likelihoodCharts: LikelihoodChart[];
  choiceCharts: ChoiceChart[];
  takeaway: string;
}

export const introCopy =
  "This section aims to highlight some of the discrepancies between respondents' answers to the survey and their actual " +
    "decisions when choosing their preferred products. Discrepancies can be seen where respondents reported a high purchase " +
    "likelihood for certain brands but did not follow up with a decision that reflected their preference. Similarly, other " +
    "respondents reported a low purchase likelihood for some brands that, in fact, outperformed some mother brands in specific scenarios.";

export const discrepancyCases: DiscrepancyCase[] = [
  {
    id: 'discrepancy-1',
    title: 'Discrepancy 1: Budweiser vs Rescue Club',
    figures: [
      {
        id: 'figure-37',
        caption: 'Budweiser Zero purchase likelihood.',
        kind: 'likelihood',
        brands: ['Budweiser Zero']
      },
      {
        id: 'figure-38',
        caption: 'Rescue Club Non-Alc purchase likelihood.',
        kind: 'likelihood',
        brands: ['Rescue Club Non-Alc']
      },
      {
        id: 'figure-39',
        caption: 'Budweiser Zero vs Rescue Club Non-Alc.',
        kind: 'choice',
        brands: ['Budweiser Zero', 'Rescue Club Non-Alc']
      }
    ],
    narrative: [
      'Purchase-likelihood ratings for Budweiser Zero and Rescue Club Non-Alc cluster around the middle of the scale with Budweiser Zero reporting slightly ahead of Rescue Club Non-Alc.',
      'When respondents are forced to choose between the two brands, Rescue Club Non-Alc pulls ahead, showing a gap between stated likelihood to purchase and actual preference in direct comparison.'
    ],
    likelihoodCharts: [
      {
        figureId: 'figure-37',
        brandLabel: 'Budweiser Zero',
        distribution: [
          { score: 1, pct: 22.0 },
          { score: 2, pct: 14.0 },
          { score: 3, pct: 23.2 },
          { score: 4, pct: 21.8 },
          { score: 5, pct: 18.9 }
        ]
      },
      {
        figureId: 'figure-38',
        brandLabel: 'Rescue Club Non-Alc',
        distribution: [
          { score: 1, pct: 25.7 },
          { score: 2, pct: 18.9 },
          { score: 3, pct: 26.4 },
          { score: 4, pct: 17.4 },
          { score: 5, pct: 11.6 }
        ]
      }
    ],
    choiceCharts: [
      {
        figureId: 'figure-39',
        kind: 'headToHead',
        shares: [
          { label: 'Rescue Club Non-Alc', pct: 60.5 },
          { label: 'Budweiser Zero', pct: 39.5 }
        ]
      }
    ],
    takeaway: ''
  },
  {
    id: 'discrepancy-2',
    title: "Discrepancy 2: Budweiser vs O’Doul’s",
    figures: [
      {
        id: 'figure-40',
        caption: "Purchase likelihood O’Doul’s Non-Alc.",
        kind: 'likelihood',
        brands: ["O’Doul’s No-Alc"]
      },
      {
        id: 'figure-41',
        caption: "Budweiser Zero vs O’Doul’s No-Alc.",
        kind: 'choice',
        brands: ['Budweiser Zero', "O’Doul’s No-Alc"]
      }
    ],
    narrative: [
        "O’Doul’s No-Alc displays generally low purchase intent, with most responses clustering between scores of 2 and 4 on the" +
        " likelihood scale. In direct comparison, however, Budweiser Zero only holds a slight advantage over O’Doul’s, despite " +
        "the large gap in stated purchase intent between the two brands. This indicates that self-reported intent may not fully " +
        "reflect the choices consumers make when faced with actual alternatives."
       ],
    likelihoodCharts: [
      {
        figureId: 'figure-40',
        brandLabel: "O’Doul’s No-Alc",
        distribution: [
          { score: 1, pct: 26.9 },
          { score: 2, pct: 19.1 },
          { score: 3, pct: 26.9 },
          { score: 4, pct: 16.0 },
          { score: 5, pct: 11.1 }
        ]
      }
    ],
    choiceCharts: [
      {
        figureId: 'figure-41',
        kind: 'headToHead',
        shares: [
          { label: 'Budweiser Zero', pct: 53.2 },
          { label: "O’Doul’s No-Alc", pct: 46.8 }
        ]
      }
    ],
    takeaway: ''
  },
  {
    id: 'discrepancy-3',
    title: 'Discrepancy 3: Beck’s likelihood vs multi-brand forced choice',
    figures: [
      {
        id: 'figure-42',
        caption: "Purchase likelihood Beck’s Blue.",
        kind: 'likelihood',
        brands: ["Beck’s Blue"]
      },
      {
        id: 'figure-43',
        caption: 'Multi-brand comparison 4 - All mother brands vs non-mother brands.',
        kind: 'choice',
        brands: [
          'Heineken 0.0',
          'Budweiser Zero',
          'Kaliber Non Alc',
          "O’Doul’s No-Alc",
          'Clausthaler Non-Alcoholic',
          "Beck’s Blue"
        ]
      }
    ],
    narrative: [
      'Beck’s Blue registers medium purchase-likelihood ratings, with the largest share of respondents selecting the medium point on the scale (3).',
      'In the multi-brand forced-choice task, Heineken 0.0 dominates while Beck’s Blue captures the smallest share out of the 6 available brands. ' +
      'The reported purchase likelihood of Beck’s Blue does not align with participants’ selections'
    ],
    likelihoodCharts: [
      {
        figureId: 'figure-42',
        brandLabel: "Beck’s Blue",
        distribution: [
          { score: 1, pct: 26.8 },
          { score: 2, pct: 20.0 },
          { score: 3, pct: 30.2 },
          { score: 4, pct: 15.6 },
          { score: 5, pct: 7.3 }
        ]
      }
    ],
    choiceCharts: [
      {
        figureId: 'figure-43',
        kind: 'multiBrand',
        shares: [
          { label: 'Heineken 0.0', pct: 47.5 },
          { label: 'Budweiser Zero', pct: 16.0 },
          { label: 'Kaliber Non Alc', pct: 13.3 },
          { label: "O’Doul’s No-Alc", pct: 9.9 },
          { label: 'Clausthaler Non-Alcoholic', pct: 7.7 },
          { label: "Beck’s Blue", pct: 5.6 }
        ]
      }
    ],
    takeaway: 'Mid-scale likelihood ratings obscure market consolidation in forced-choice tasks.'
  }
];

export const metaInsights = [
  'Purchase-likelihood ratings cluster mid-scale across brands (muted enthusiasm).',
  'Choice tasks reveal sharper, more realistic competitive dominance (e.g., Heineken 0.0).'
];

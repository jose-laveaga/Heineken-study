export const heinekenDeepDive = {
  performance: {
    avgSentiment: 0.23,
    marketPosition:
      "Heineken’s sentiment score equals the competitors’ average (0.23). This suggests it is solid/reliable but not differentiating on emotional “delight” vs the category baseline."
  },
  keywordThemes: {
    positiveDrivers: {
      title: 'Drivers of Positive Sentiment',
      bullets: [
        '“Familiar” / “Know”: strongest themes; Heineken as a safe bet; trust in logo; predictable expectation.',
        '“Taste” / “Like”: functional approval; often tied to expecting it to resemble the “real thing”.',
        '“Most”: phrases like “most recognizable” / “most trusted”.'
      ],
      summary:
        'Consumers choose Heineken primarily as a safe bet—familiar/known choice that guarantees a standard of taste, not novelty/excitement.',
      chips: ['Familiar', 'Know', 'Taste', 'Like', 'Most']
    },
    barriers: {
      title: 'Barriers to Adoption (Drivers of Neutral & Negative Sentiment)',
      bullets: [
        'Habitual Preference & Brand Loyalty: neutral/negative often reflects entrenched habits (“usually”, “other”), defaulting to existing preferences or favoring the alternative in comparisons; barrier is often loyalty to competitors rather than aversion to Heineken itself.',
        'Polarizing Flavor Profile: taste is polarizing; signature profile drives loyalty for some but rejection for others; negative sentiment often from explicit dislike of that specific taste profile (not low quality).'
      ],
      chips: ['Usually', 'Other', 'Polarizing taste']
    }
  },
  quotes: [
    {
      id: 'safe-bet',
      title: 'Heineken: “Safe Bet” (Trust & Familiarity)',
      quotes: [
        "Because Heineken tastes the best!!! It's been around for ages and is the brand I trust.",
        "I chose it because it’s a brand I already know and trust. The taste is consistent, it’s easy to find, and it feels like a safe pick.",
        'Heineken is a brand that I know well and trust. Has great flavor.',
        "I chose Heineken because of the well known name brand. I know what I'm getting with Heineken."
      ]
    },
    {
      id: 'novelty',
      title: 'Competitors: “Novelty Factor” (Design & Curiosity)',
      quotes: [
        "The packaging and the fact that it's an IPA is perfect.",
        "Although I've never tried this beer, I LOVE the packaging! This drew me in!",
        'I like the design on the can. I think the layout of the words on the label looks best.',
        'I tried finding new brands and the one I chose had a very nice design on the can and color scheme.'
      ],
      sources: ['Rescue Club', 'Cobra Zero', "Penn's Best", 'General']
    },
    {
      id: 'barriers',
      title: 'Barriers to Heineken (Why some chose others)',
      quotes: [
        'I usually drink non-alcoholic beer with specific meals... I prefer a German-type taste along with it.',
        "I looked for a classic brand that could come off as making a grounded yet fun choice... O'Douls is a classic brand and checks all the boxes."
      ]
    }
  ],
  recommendation: {
    title: 'Strategic recommendation for Heineken',
    body:
      'Since familiarity is the primary driver, Heineken wins on trust but is vulnerable on excitement. Niche brands scoring higher may benefit from “pleasant surprise” / novelty. To increase sentiment, Heineken should emphasize “refreshing” or “surprising” qualities of the 0.0 product—not only legacy status.'
  }
};

export type HeinekenDeepDive = typeof heinekenDeepDive;

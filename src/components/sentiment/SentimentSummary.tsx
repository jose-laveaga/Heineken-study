import Card from '../ui/Card';
import Callout from '../ui/Callout';

const narrativePoints = [
  'We analyzed open-ended participant responses explaining brand choices and overall decision factors.',
  'Sentiment measured using polarity from -1 (Negative) to +1 (Positive).',
  'Category is viewed favorably (avg ≈ 0.23).',
  'Established brands (e.g., Heineken) rely on “emotional safety”, trust, familiarity; niche competitors can score higher due to novelty.',
  '“Penn’s Best” has the highest sentiment but smaller sample size; major players cluster closely in the middle.',
    'Across the analysis, brand names and its derivatives were grouped into a single bucket. Ex. Mentions of “Penn’s Best” and “Penns” ' +
    'were considered as the same brand.'
];

const SentimentSummary = () => (
  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    <Card>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sentiment analysis overview</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {narrativePoints.map((point) => (
          <li key={point}>• {point}</li>
        ))}
      </ul>
    </Card>
    <Callout variant="insight" title="Key takeaway">
      Heineken matches the category average on sentiment, signaling dependable trust. The opportunity is to
      elevate “delight” cues that differentiate beyond familiarity.
    </Callout>
  </div>
);

export default SentimentSummary;

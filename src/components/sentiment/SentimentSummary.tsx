import Card from '../ui/Card';
import Callout from '../ui/Callout';

const narrativePoints = [
  'We analyzed open-ended participant responses describing brand choice rationales and overall decision criteria. Sentiment was quantified using a polarity score ranging from −1 (negative) to +1 (positive). Overall sentiment toward the non-alcoholic beer category is moderately positive (mean ≈ 0.23).',
  'Across the corpus, established brands (e.g., Heineken) are frequently associated with constructs consistent with affective reassurance, including trust, familiarity, and perceived reliability. In contrast, smaller or niche brands can attain higher sentiment scores, plausibly reflecting novelty-related value (e.g., perceived distinctiveness or “pleasant surprise”). “Penn’s Best” exhibits the highest observed sentiment; however, interpretability is constrained by a smaller sample size. Sentiment scores among major brands are tightly clustered near the center of the distribution, indicating limited differentiation on affect alone.\n',
  'For analytic consistency, brand mentions were canonicalized by grouping brand names and their derivatives into a single entity (e.g., “Penn’s Best” and “Penns” were treated as the same brand).',

];

const SentimentSummary = () => (
  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    <Card>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sentiment analysis overview</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        {narrativePoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </Card>
    <Callout variant="insight" title="Key takeaway">
        Heineken’s sentiment aligns with the category mean, consistent with a positioning anchored in
        dependable trust and reduced decision risk. The primary opportunity is to strengthen “delight” cues, that is, signals of enjoyment and differentiation that extend beyond familiarity.
    </Callout>
  </div>
);

export default SentimentSummary;

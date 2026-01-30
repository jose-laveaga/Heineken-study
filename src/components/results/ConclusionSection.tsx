import Section from '../ui/Section';
import HypothesisOutcomeChart from './HypothesisOutcomeChart';
import HypothesisCard from './HypothesisCard';
import {
  conclusionIntroParagraphs,
  conclusionKeyTakeaway,
  conclusionClosingParagraph,
  hypotheses
} from '../../data/conclusion';

const ConclusionSection = () => (
  <Section id="conclusion" title="Conclusion" subtitle="Executive summary and hypothesis outcomes">
    <div className="space-y-6">
      <div className="space-y-4">
        {conclusionIntroParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm text-slate-600">
            {paragraph}
          </p>
        ))}
      </div>
      <HypothesisOutcomeChart hypotheses={hypotheses} keyTakeaway={conclusionKeyTakeaway} />
      <div className="grid gap-6 lg:grid-cols-3">
        {hypotheses.map((hypothesis) => (
          <HypothesisCard key={hypothesis.id} hypothesis={hypothesis} />
        ))}
      </div>
      <p className="text-sm text-slate-600">{conclusionClosingParagraph}</p>
    </div>
  </Section>
);

export default ConclusionSection;

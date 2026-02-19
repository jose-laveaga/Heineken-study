import Section from '../ui/Section';
import HypothesisCard from './HypothesisCard';
import {
  conclusionIntroParagraphs,
  conclusionClosingParagraph,
  hypotheses
} from '../../data/conclusion';

const ConclusionSection = () => (
  <Section id="conclusion" title="Conclusion" subtitle="Executive summary and hypothesis outcomes" className="text-justify">
    <div className="space-y-6 text-justify">
      <div className="space-y-4">
        {conclusionIntroParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm text-slate-600 text-justify">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 text-justify">
        {hypotheses.map((hypothesis) => (
          <HypothesisCard key={hypothesis.id} hypothesis={hypothesis} />
        ))}
      </div>
      <p className="text-sm text-slate-600 text-justify">{conclusionClosingParagraph}</p>
    </div>
  </Section>
);

export default ConclusionSection;

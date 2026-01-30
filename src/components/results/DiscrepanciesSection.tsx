import Section from '../ui/Section';
import Card from '../ui/Card';
import DiscrepancyCaseCard from './DiscrepancyCaseCard';
import { discrepancyCases, introCopy, metaInsights } from '../../data/discrepancies';

const DiscrepanciesSection = () => (
  <Section
    id="discrepancies"
    title="Discrepancies in Participants’ Responses"
    subtitle="Where intent diverges from forced choice"
  >
    <div className="space-y-8">
      <p className="max-w-3xl text-sm leading-relaxed text-slate-600">{introCopy}</p>
      <div className="space-y-8">
        {discrepancyCases.map((caseItem) => (
          <DiscrepancyCaseCard key={caseItem.id} caseItem={caseItem} />
        ))}
      </div>
      <Card>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Meta-insights</p>
          <ul className="space-y-2 text-sm text-slate-600">
            {metaInsights.map((insight) => (
              <li key={insight}>• {insight}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  </Section>
);

export default DiscrepanciesSection;

import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Callout from '../components/ui/Callout';
import StatCard from '../components/ui/StatCard';
import Chip from '../components/ui/Chip';
import MethodTimeline from '../components/content/MethodTimeline';
import studyDesign from '../data/studyDesign.json';

const StudyDesignSection = () => {
  const {
    objective,
    experimentalDesign,
    scenarios,
    brandSetRationale,
    recruitment,
    stages,
    participantExperience
  } = studyDesign;

  return (
    <Section
      id="study-design"
      title="Study Design"
      subtitle="How the study was structured and what participants did"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">Study objective & approach</p>
            <p className="mt-3 text-sm text-slate-600">{objective.paragraph}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {objective.bullets.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">Experimental design</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-700">Design type:</span> {experimentalDesign.designType}
              </p>
              <p>
                <span className="font-semibold text-slate-700">Rationale:</span> {experimentalDesign.rationale}
              </p>
              <p>
                <span className="font-semibold text-slate-700">Environment:</span> {experimentalDesign.environment}
              </p>
            </div>
          </Card>

          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">Scenarios tested</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Brand scenarios</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {scenarios.brandScenarios.map((scenario) => (
                    <li key={scenario}>• {scenario}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Price scenarios</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {scenarios.priceScenarios.map((scenario) => (
                    <Chip key={scenario} label={scenario} />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">Recruitment & eligibility</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {recruitment.kpis.map((kpi) => (
                <StatCard key={kpi.label} label={kpi.label} value={kpi.value} />
              ))}
            </div>
            {recruitment.note ? (
              <p className="mt-3 text-xs text-slate-500">{recruitment.note}</p>
            ) : null}
          </Card>

          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">Brand set rationale</p>
            <p className="mt-3 text-sm text-slate-600">{brandSetRationale.paragraph}</p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-2 py-2 text-left font-semibold">Brand type</th>
                    <th className="px-2 py-2 text-left font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {brandSetRationale.table.map((row) => (
                    <tr key={row.type} className="border-t border-slate-100">
                      <td className="px-2 py-2 font-medium text-slate-700">{row.type}</td>
                      <td className="px-2 py-2 text-slate-600">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {brandSetRationale.callout ? (
              <div className="mt-4">
                <Callout variant="note" title="Design control">
                  {brandSetRationale.callout}
                </Callout>
              </div>
            ) : null}
          </Card>

          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-500">What participants did</p>
            <p className="mt-3 text-sm text-slate-600">{participantExperience.sentence}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {participantExperience.bullets.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card className="mt-8">
        <p className="text-xs uppercase tracking-wide text-slate-500">Study stages and deliverables</p>
        <div className="mt-4">
          <MethodTimeline stages={stages} />
        </div>
      </Card>
    </Section>
  );
};

export default StudyDesignSection;

interface Step {
  title: string;
  bullets: string[];
}

interface ExperimentStepperProps {
  steps: Step[];
}

const ExperimentStepper = ({ steps }: ExperimentStepperProps) => (
  <div className="space-y-4">
    {steps.map((step, index) => (
      <details key={step.title} className="group rounded-2xl border border-slate-200 bg-white">
        <summary className="flex cursor-pointer items-start gap-4 p-4 list-none [&::-webkit-details-marker]:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            {index + 1}
          </div>
          <div className="flex flex-1 items-start justify-between gap-4">
            <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
            <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </summary>
        <div className="px-4 pb-4">
          <ul className="space-y-1 text-xs text-slate-600">
            {step.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </div>
      </details>
    ))}
  </div>
);

export default ExperimentStepper;

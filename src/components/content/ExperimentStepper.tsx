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
      <div key={step.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
          {index + 1}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
          <ul className="mt-2 space-y-1 text-xs text-slate-600">
            {step.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

export default ExperimentStepper;

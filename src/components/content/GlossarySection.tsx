import { useMemo, useState } from 'react';
import Section from '../ui/Section';

const glossaryItems = [
  {
    term: 'Alternative hypothesis',
    definition:
      'States that a meaningful effect or relationship exists. Evidence that contradicts the null hypothesis supports this.'
  },
  {
    term: 'Central tendency',
    definition:
      'A summary of the typical value in a distribution, such as the median. It helps compare what is “normal” across groups.'
  },
  {
    term: 'Coefficient',
    definition:
      'A model estimate that shows how a predictor shifts the outcome. Positive values increase the outcome; negative values decrease it.'
  },
  {
    term: 'Confidence interval (CI)',
    definition:
      'A range of plausible values for a metric (often 95%). Narrow ranges mean more precise estimates.'
  },
  {
    term: 'Correlation',
    definition:
      'Measures how two variables move together. Strong positive means they rise together; negative means one rises as the other falls.'
  },
  {
    term: 'Distribution',
    definition:
      'The spread of values across outcomes. Distributions show whether results cluster or vary widely.'
  },
  {
    term: 'Hypothesis',
    definition:
      'A testable statement about relationships or differences. Analyses check whether the data support it.'
  },
  {
    term: 'Logistic regression',
    definition:
      'A model that estimates the probability of a yes/no outcome. Expected results are probabilities and odds ratios, not averages.'
  },
  {
    term: 'Marginal means (predicted margins)',
    definition:
      'Model-based averages for specific groups. Useful for comparing expected outcomes after accounting for other factors.'
  },
  {
    term: 'Median',
    definition:
      'The middle value when results are ordered. Half the values are higher and half are lower.'
  },
  {
    term: 'Null hypothesis',
    definition:
      'Assumes no effect or relationship. Small p-values suggest the data are unlikely under this assumption.'
  },
  {
    term: 'Odds ratio',
    definition:
      'Compares odds between groups. A value above 1 means higher odds; below 1 means lower odds.'
  },
  {
    term: 'P-value',
    definition:
      'Shows how surprising the results are if the null hypothesis is true. Smaller values (e.g., < 0.05) suggest stronger evidence against the null.'
  },
  {
    term: 'Predicted probability',
    definition:
      'The likelihood of an outcome estimated by a model. Higher values mean the outcome is expected more often.'
  },
  {
    term: 'Quartile',
    definition:
      'A value that splits ordered data into four equal parts. Quartiles help compare spread and skew.'
  },
  {
    term: 'Sample size',
    definition:
      'The number of observations or respondents analyzed. Larger samples usually produce more stable estimates.'
  },
  {
    term: 'Statistical significance',
    definition:
      'Indicates an effect is unlikely due to chance given a threshold (like p < 0.05). It does not measure practical importance.'
  },
  {
    term: 'Stratified sample',
    definition:
      'A sampling method that ensures key subgroups are represented by sampling within each subgroup.'
  },
  {
    term: 'Variance',
    definition:
      'Measures how spread out values are. Higher variance means outcomes are more dispersed.'
  }
];

const GlossarySection = () => {
  const [query, setQuery] = useState('');
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return glossaryItems;

    return glossaryItems.filter(({ term, definition }) =>
      `${term} ${definition}`.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  return (
    <Section
      id="glossary"
      title="Glossary"
      subtitle="Statistical terms referenced across the report and methodology."
      actions={
        <div className="w-full max-w-sm">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="glossary-search">
            Search terms
          </label>
          <input
            id="glossary-search"
            type="search"
            placeholder="Search by term or meaning"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="mt-2 w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
      }
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        {filteredItems.map((item) => (
          <div key={item.term} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <dt className="text-sm font-semibold text-slate-900">{item.term}</dt>
            <dd className="mt-1 text-sm text-slate-600">{item.definition}</dd>
          </div>
        ))}
      </dl>
      {filteredItems.length === 0 ? (
        <p className="text-sm text-slate-500">No terms match that search. Try another keyword.</p>
      ) : null}
    </Section>
  );
};

export default GlossarySection;

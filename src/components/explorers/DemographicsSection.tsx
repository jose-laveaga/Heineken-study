import ChartCard from '../charts/ChartCard';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import demographics from '../../data/demographics.json';

const DemographicsSection = () => (
  <div className="grid gap-6 lg:grid-cols-2">
    {demographics.sections.map((section) => {
      const dataTable = (
        <table className="w-full">
          <tbody>
            {section.items.map((item) => (
              <tr key={item.label} className="border-b border-slate-200 last:border-0">
                <td className="py-1 text-left font-medium text-slate-700">{item.label}</td>
                <td className="py-1 text-right text-slate-600">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );

      return (
        <ChartCard key={section.id} title={section.title} dataTable={dataTable}>
          <HorizontalBarChart
            data={section.items}
            ariaLabel={`${section.title} distribution`}
            valueSuffix=" participants"
          />
        </ChartCard>
      );
    })}
  </div>
);

export default DemographicsSection;

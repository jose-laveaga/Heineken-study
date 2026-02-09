import { useState } from 'react';
import AppShell from './components/layout/AppShell';
import Header from './components/layout/Header';
import Toc from './components/layout/Toc';
import GlossarySection from './components/content/GlossarySection';
import ReportPage, { reportSections } from './pages/ReportPage';
import MethodologyPage, { methodologySections } from './pages/MethodologyPage';

// TODO: Replace placeholder figures in /src/data/*.json with the final report numbers.

const pages = [
  { id: 'report', label: 'Report' },
  { id: 'methodology', label: 'Methodology' }
];

const App = () => {
  const [activePage, setActivePage] = useState('report');
  const sections = activePage === 'report' ? reportSections : methodologySections;
  const handlePageChange = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <Header pages={pages} activePage={activePage} onPageChange={handlePageChange} />
      <AppShell>
        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_220px]">
          <div className="grid gap-10">
            {activePage === 'report' ? <ReportPage /> : <MethodologyPage />}
          </div>
          <Toc sections={sections} />
        </div>
        <GlossarySection />
      </AppShell>
    </div>
  );
};

export default App;

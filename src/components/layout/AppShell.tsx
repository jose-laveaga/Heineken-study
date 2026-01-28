import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
  <div className="min-h-screen bg-slate-50">
    <div className="mx-auto grid flex-col gap-10 px-12 pb-16 pt-24">
      {children}
    </div>
  </div>
);

export default AppShell;

import { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
  <div className="min-h-screen bg-slate-50">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-24">
      {children}
    </div>
  </div>
);

export default AppShell;

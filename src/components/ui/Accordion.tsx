import { ReactNode, useState } from 'react';
import clsx from 'clsx';

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
}

const Accordion = ({ items, defaultOpenId }: AccordionProps) => {
  const [openId, setOpenId] = useState(defaultOpenId ?? items[0]?.id);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-white">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? '' : item.id)}
            >
              <span className="text-sm font-semibold text-slate-800">{item.title}</span>
              <span className={clsx('text-xs uppercase tracking-wide text-slate-500', isOpen && 'text-slate-900')}>
                {isOpen ? 'Close' : 'Open'}
              </span>
            </button>
            {isOpen ? <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600">{item.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => (
  <button
    className={clsx(
      'inline-flex items-center justify-center rounded-b rounded-t px-4 py-2 text-sm font-semibold transition',
      variant === 'primary'
        ? 'bg-slate-700 text-white hover:bg-slate-600'
        : 'border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400',
      className
    )}
    {...props}
  />
);

export default Button;

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => (
  <button
    className={clsx(
      'inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition',
      variant === 'primary'
        ? 'bg-slate-900 text-white hover:bg-slate-800'
        : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-400',
      className
    )}
    {...props}
  />
);

export default Button;

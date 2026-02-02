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
        ? 'bg-[#8e9e72] text-white hover:bg-[#A3B18A] '
        : 'border border-slate-200 bg-white text-slate-600 hover:border-[#818f67]',
      className
    )}
    {...props}
  />
);

export default Button;

import { ComponentProps } from 'react';

import { cn } from '../../app/utils/cn';

import { Spinner } from './spinner';

type ButtonProps = ComponentProps<'button'> & {
  isLoading?: boolean;
  variant?: 'danger' | 'ghost';
};

export function Button({
  className, isLoading, disabled, children, variant, ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'bg-primary-default hover:bg-primary-default/80 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl font-medium text-white transition-all flex items-center justify-center',
        variant === 'danger' && 'bg-red-900 hover:bg-red-700',
        variant === 'ghost' && 'bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/10',
        className,
      )}
    >
      {' '}
      {!isLoading && children}
      {isLoading && <Spinner className="w-6 h-6" />}
    </button>
  );
}

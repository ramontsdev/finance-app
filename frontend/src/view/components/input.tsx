import { CrossCircledIcon } from '@radix-ui/react-icons';
import { ComponentProps, forwardRef } from 'react';

import { cn } from '../../app/utils/cn';

type InputProps = ComponentProps<'input'> & {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  placeholder, name, id, error, className, ...props
}, ref) => {
  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        name={name}
        id={inputId}
        className={cn(
          `bg-gray-default w-full rounded-lg border border-gray-300 px-3 h-[52px] text-gray-50 pt-4 peer placeholder-shown:pt-0
          focus:border-gray-50 transition-all outline-none`,
          error && '!border-red-900',
          className,
        )}
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs top-2 left-[13px]  pointer-events-none text-gray-50
        peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
});
Input.displayName = 'Input';

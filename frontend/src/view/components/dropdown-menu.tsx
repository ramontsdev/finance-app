import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ReactNode } from 'react';

import { cn } from '../../app/utils/cn';

function DropdownMenuRoot({ children }: { children: ReactNode }) {
  return (
    <RdxDropdownMenu.Root>
      {children}
    </RdxDropdownMenu.Root>
  );
}

function DropdownMenuTrigger({ children }: { children: ReactNode }) {
  return (
    <RdxDropdownMenu.Trigger className="outline-none" asChild>
      {children}
    </RdxDropdownMenu.Trigger>
  );
}

type DropdownMenuContentProps = {
  children: ReactNode;
  className?: string;
}

function DropdownMenuContent({ children, className }: DropdownMenuContentProps) {
  return (
    <RdxDropdownMenu.Portal>

      <RdxDropdownMenu.Content
        side="bottom"
        className={cn(
          'rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99] mr-3',
          'data-[side=bottom]:animate-slide-up-and-fade',
          'data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}

type DropdownMenuItemProps = {
  children: ReactNode;
  className?: string;
  onSelect?(): void;
}
function DropdownMenuItem({ children, className, onSelect }: DropdownMenuItemProps) {
  return (
    <RdxDropdownMenu.Item
      onSelect={onSelect}
      className={cn(
        `min-h-[40px] outline-none flex items-center px-4 py-2 text-gray-800 text-sm data-[highlighted]:bg-gray-100 rounded-2xl transition-colors
        cursor-pointer`,
        className,
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};

// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { ExitIcon } from '@radix-ui/react-icons';

import { useAuth } from '../../app/hooks/use-auth';
import { useDashboard } from '../pages/dashboard/components/dashboard-context/useDashboard';

import { DropdownMenu } from './dropdown-menu';

export function UserMenu() {
  const { signOut, user } = useAuth();
  const { openFeedbackSendingModalOpen } = useDashboard();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div
          role="button"
          className="bg-violet-0 rounded-full w-12 h-12 flex items-center justify-center border border-violet-200"
        >
          <span className="text=sm tracking-[-0.5px] text-violet-900 font-medium select-none">
            {user?.name.slice(0, 2).toLocaleUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-36 mr-3">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={openFeedbackSendingModalOpen}
        >
          Feedback
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg>
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signOut}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

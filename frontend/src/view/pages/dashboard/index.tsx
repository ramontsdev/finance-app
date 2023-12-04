import { Logo } from '../../components/logo';
import { UserMenu } from '../../components/user-menu';

import { Accounts } from './components/accounts';
import { DashboardContext, DashboardProvider } from './components/dashboard-context';
import { Fab } from './components/fab';
import { Transactions } from './components/transactions';
import { EditAccountModal } from './modals/edit-account-modal';
import { FeedbackSendingModal } from './modals/feedback-sending-modal';
import { NewAccountModal } from './modals/new-account-modal';
import { NewTransactionModal } from './modals/new-transaction-modal';

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="w-full h-full bg-gray-default flex flex-col p-6 max-md:p-0">
            <header className="h-12 p-4 pb-8 flex items-center justify-between max-md:py-8">
              <Logo className="h-6 text-primary-default" />
              <UserMenu />
            </header>

            <main className="h-full flex flex-1 max-md:flex-col">
              <div className="flex flex-col w-1/2 h-full p-4 bg-gray-900 rounded-l-2xl max-md:rounded-none max-md:w-full max-md:h-[50%]">
                <Accounts />
              </div>

              <div className="flex flex-col w-1/2 h-full bg-gray-500 rounded-r-2xl relative max-md:rounded-none max-md:w-full">
                <Transactions />
              </div>
            </main>

            <Fab />
            <NewAccountModal />
            <NewTransactionModal />
            <FeedbackSendingModal />
            {accountBeingEdited && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}

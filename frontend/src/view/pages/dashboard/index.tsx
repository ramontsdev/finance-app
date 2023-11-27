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
          <div className="w-full h-full bg-white flex flex-col p-6 max-md:p-0">
            <header className="h-12 p-4 pb-8 flex items-center justify-between max-md:py-8">
              <Logo className="h-6 text-violet-950" />
              <UserMenu />
            </header>

            <main className="h-full flex flex-1 max-md:flex-col">
              <div className="flex flex-col w-1/2 h-full p-4 bg-violet-950 rounded-l-2xl max-md:rounded-none max-md:rounded-t-2xl max-md:w-full max-md:h-[50%]">
                <Accounts />
              </div>

              <div className="flex flex-col w-1/2 h-full bg-violet-100 rounded-r-2xl relative max-md:rounded-none max-md:rounded-b-2xl max-md:w-full">
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

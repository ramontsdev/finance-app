import { BankAccounts } from "./components/bank-accounts";
import { DashboardContext, DashboardProvider } from "./components/dashboard-context";
import { Fab } from "./components/fab";
import { Header } from "./components/header";
import { AddBankAccountModal } from "./components/modals/add-bank-accounts-modal";
import { AddTransactionModal } from "./components/modals/add-transaction-modal";
import { EditBankAccountModal } from "./components/modals/edit-bank-account-modal";
import { TransactionsSide } from "./components/transactions";
import { Container } from "./styles";

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ bankAccountBeingEdited }) => (
          <Container>
            <Header />

            <BankAccounts />

            <TransactionsSide />

            <Fab />
            <AddBankAccountModal />
            <AddTransactionModal />
            {bankAccountBeingEdited && <EditBankAccountModal />}
          </Container>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  )
}

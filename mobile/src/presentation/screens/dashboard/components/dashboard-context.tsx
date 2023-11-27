import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { BankAccount } from "../../../../models/bank-account";

type DashboardContextProps = {
  isOpenAddBankAccountModal: boolean;
  openAddBankAccountModal: () => void;
  closeAddBankAccountModal: () => void;
  isOpenEditBankAccountModal: boolean;
  bankAccountBeingEdited: BankAccount | null
  openEditBankAccountModal: (bankAccount: BankAccount) => void;
  closeEditBankAccountModal: () => void;
  isOpenAddTransactionModal: boolean;
  openAddTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeAddTransactionModal: () => void;
  newTransactionType: "INCOME" | "EXPENSE" | null;
}
export const DashboardContext = createContext({} as DashboardContextProps);

type Props = {
  children: ReactNode;
}
export function DashboardProvider({ children }: Props) {
  const [isOpenAddBankAccountModal, setIsOpenAddBankAccountModal] = useState(false);
  const [isOpenAddTransactionModal, setIsOpenAddTransactionModal] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);
  const [isOpenEditBankAccountModal, setIsOpenEditBankAccountModal] = useState(false);
  const [bankAccountBeingEdited, setBankAccountBeingEdited] = useState<BankAccount | null>(null);

  const openAddBankAccountModal = useCallback(() => {
    setIsOpenAddBankAccountModal(true);
  }, []);
  const closeAddBankAccountModal = useCallback(() => {
    setIsOpenAddBankAccountModal(false);
  }, []);

  const openEditBankAccountModal = useCallback((bankAccount: BankAccount) => {
    setBankAccountBeingEdited(bankAccount);
    setIsOpenEditBankAccountModal(true);
  }, []);
  const closeEditBankAccountModal = useCallback(() => {
    setBankAccountBeingEdited(null);
    setIsOpenEditBankAccountModal(false);
  }, []);

  const openAddTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsOpenAddTransactionModal(true);
  }, []);
  const closeAddTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsOpenAddTransactionModal(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        isOpenAddBankAccountModal,
        openAddBankAccountModal,
        closeAddBankAccountModal,
        isOpenEditBankAccountModal,
        bankAccountBeingEdited,
        openEditBankAccountModal,
        closeEditBankAccountModal,
        isOpenAddTransactionModal,
        openAddTransactionModal,
        closeAddTransactionModal,
        newTransactionType
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);

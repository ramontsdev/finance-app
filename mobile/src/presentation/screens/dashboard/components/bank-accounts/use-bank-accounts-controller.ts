import { useMemo } from "react";
import { useBankAccounts } from "../../../../hooks/use-bank-accounts";
import { useDashboard } from "../dashboard-context";

export function useBankAccountsController() {
  const {
    openEditBankAccountModal,
    openAddBankAccountModal,
    toggleValuesVisibility,
    areValuesVisible
  } = useDashboard();

  const { bankAccounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(
    () => bankAccounts.reduce((total, account) => total + account.currentBalance, 0),
    [bankAccounts],
  );

  return {
    bankAccounts,
    isFetching,
    openEditBankAccountModal,
    openAddBankAccountModal,
    currentBalance,
    toggleValuesVisibility,
    areValuesVisible
  };
};

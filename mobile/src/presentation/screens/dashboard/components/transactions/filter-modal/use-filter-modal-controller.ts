import { useState } from "react";
import { useBankAccounts } from "../../../../../hooks/use-bank-accounts";

export function useFilterModalController() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { bankAccounts } = useBankAccounts();

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId(
      (prevState) => (prevState === bankAccountId
        ? undefined
        : bankAccountId),
    );
  };

  function handleSelectYear(step: number) {
    setSelectedYear(prevState => prevState + step);
  };

  function resetFilter() {
    setSelectedBankAccountId(undefined);
    setSelectedYear(new Date().getFullYear());
  };

  return {
    bankAccounts,
    handleSelectYear,
    selectedYear,
    handleSelectBankAccount,
    selectedBankAccountId,
    resetFilter
  };
};

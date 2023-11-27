import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../infra/bank-accounts-service";
import { useDashboard } from "../dashboard-context";

export function useBankAccountsController() {
  const { openEditBankAccountModal, openAddBankAccountModal } = useDashboard();

  const { data, isFetching } = useQuery({
    queryKey: ['bank-accounts'],
    queryFn: bankAccountsService.loadBankAccounts,
    staleTime: Infinity
  });

  return {
    bankAccounts: data ?? [],
    isFetching,
    openEditBankAccountModal,
    openAddBankAccountModal
  };
};

import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../../infra/bank-accounts-service";

export function useBankAccounts() {
  const { data, isFetching } = useQuery({
    queryKey: ['bank-accounts'],
    queryFn: bankAccountsService.loadBankAccounts,
    staleTime: Infinity,
  });

  return {
    bankAccounts: data ?? [],
    isFetching,
  };
}

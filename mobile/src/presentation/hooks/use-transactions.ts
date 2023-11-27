import { useQuery } from '@tanstack/react-query';
import { TransactionFilters, transactionsService } from '../../infra/transactions-service';

export function useTransactions(filters: TransactionFilters) {
  const {
    data, isFetching, isInitialLoading, refetch,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.loadTransactions(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch,
  };
}

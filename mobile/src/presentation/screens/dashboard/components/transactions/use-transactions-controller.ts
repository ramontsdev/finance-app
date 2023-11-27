import { useEffect, useState } from 'react';

import { TransactionFilters } from '../../../../../infra/transactions-service';
import { Transaction } from '../../../../../models/transaction';
import { useTransactions } from '../../../../hooks/use-transactions';

export function useTransactionsController() {
  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [isOpenEditTransactionModal, setIsOpenEditTransactionModal] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);

  const {
    transactions, isLoading, isInitialLoading, refetchTransactions,
  } = useTransactions(filters);

  function handleChangeFilters<TFilter extends keyof TransactionFilters>(filter: TFilter) {
    return (value: TransactionFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function openEditTransactionModal(transaction: Transaction) {
    setTransactionBeingEdited(transaction);
    setIsOpenEditTransactionModal(true);
  }
  function closeEditTransactionModal() {
    setTransactionBeingEdited(null);
    setIsOpenEditTransactionModal(false);
  }

  return {
    transactions: transactions ?? [],
    refetchTransactions,
    handleChangeFilters,
    filters,
    isLoading,
    isOpenEditTransactionModal,
    transactionBeingEdited,
    openEditTransactionModal,
    closeEditTransactionModal
  };
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { transactionsService } from "../../../../../../infra/transactions-service";
import { Transaction } from "../../../../../../models/transaction";
import { useBankAccounts } from "../../../../../hooks/use-bank-accounts";
import { useCategories } from "../../../../../hooks/use-categories";

const schema = z.object({
  name: z.string().min(1, 'Digite o nome da conta'),
  value: z.number({ invalid_type_error: 'Um valor a partir de zero' }),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a categoria'),
  transactionDate: z.date(),
});

type FormValues = z.infer<typeof schema>;

export function useEditTransactionModalController(transaction: Transaction | null, onClose: () => void) {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: transaction?.value,
      name: transaction?.name,
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      transactionDate: new Date(transaction?.date!),
    }
  });

  const { bankAccounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(
    () => categoriesList.filter((category) => category.type === transaction?.type),
    [categoriesList, transaction],
  );

  const openDatePicker = useCallback(() => {
    setIsOpenDatePicker(true);
  }, []);
  const closeDatePicker = useCallback(() => {
    setIsOpenDatePicker(false);
  }, []);

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(transactionsService.updateTransaction);

  const handleSubmit = hookFormSubmit(async (values) => {
    if (!transaction) return;

    try {
      await mutateAsync({
        ...values,
        id: transaction.id,
        type: transaction.type,
        date: values.transactionDate.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      Toast.show({
        type: 'success',
        text1: transaction.type === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: transaction.type === 'EXPENSE'
          ? 'Error ao cadastrar despesa.'
          : 'Error ao cadastrar receita.',
      });
    }

    onClose();
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutateAsync: deleteTransaction } = useMutation(transactionsService.deleteTransaction);

  async function handleDeleteTransaction() {
    try {
      await deleteTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });

      Toast.show({
        type: 'success',
        text1: transaction?.type === 'EXPENSE'
          ? 'Despesa excluída com sucesso!'
          : 'Receita excluída com sucesso!',
      });

      onClose();
    } catch {
      Toast.show({
        type: 'error',
        text1: transaction?.type === 'EXPENSE'
          ? 'Error ao excluir despesa.'
          : 'Error ao excluir receita.',
      });
    }
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  return {
    control,
    errors,
    handleSubmit,
    categories,
    bankAccounts,
    openDatePicker,
    closeDatePicker,
    isOpenDatePicker,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction
  }
}

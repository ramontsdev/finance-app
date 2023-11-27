import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { transactionsService } from "../../../../../../infra/transactions-service";
import { useBankAccounts } from "../../../../../hooks/use-bank-accounts";
import { useCategories } from "../../../../../hooks/use-categories";
import { useDashboard } from "../../dashboard-context";

const schema = z.object({
  name: z.string().min(1, 'Digite o nome da conta'),
  value: z.number({ invalid_type_error: 'Um valor a partir de zero' }),
  categoryId: z.string().min(1, 'Informe a categoria'),
  bankAccountId: z.string().min(1, 'Informe a categoria'),
  transactionDate: z.date(),
});

type FormValues = z.infer<typeof schema>;

export function useAddTransactionModalController() {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  const {
    isOpenAddTransactionModal,
    closeAddTransactionModal,
    newTransactionType
  } = useDashboard();

  const { categories: categoriesList } = useCategories();
  const { bankAccounts } = useBankAccounts();

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    resetField,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: 0,
      name: '',
      bankAccountId: '',
      categoryId: '',
      transactionDate: new Date(),
    }
  });

  const { mutateAsync } = useMutation(transactionsService.create);
  const queryClient = useQueryClient();

  const handleSubmit = hookFormSubmit(async (values) => {

    const transactionType = newTransactionType as "INCOME" | "EXPENSE";

    try {
      await mutateAsync({
        ...values,
        date: values.transactionDate.toISOString(),
        type: transactionType
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      Toast.show({
        type: 'success',
        text1: newTransactionType === 'EXPENSE'
          ? 'Despesa cadastrada com sucesso!'
          : 'Receita cadastrada com sucesso!',
      })

      handleCloseModal();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: newTransactionType === 'EXPENSE'
          ? 'Error ao cadastrar despesa.'
          : 'Error ao cadastrar receita.',
      });
    }

  });

  const handleCloseModal = useCallback(() => {
    closeAddTransactionModal();
    resetField('value');
    resetField('name');
    resetField('bankAccountId');
    resetField('categoryId');
    resetField('transactionDate');
  }, []);

  const openDatePicker = useCallback(() => {
    setIsOpenDatePicker(true);
  }, [])
  const closeDatePicker = useCallback(() => {
    setIsOpenDatePicker(false);
  }, [])

  const categories = useMemo(
    () => categoriesList.filter((category) => category.type === newTransactionType),
    [categoriesList, newTransactionType],
  );

  return {
    control,
    errors,
    handleSubmit,
    isOpenAddTransactionModal,
    handleCloseModal,
    categories,
    bankAccounts,
    newTransactionType,
    openDatePicker,
    closeDatePicker,
    isOpenDatePicker,
  }
}

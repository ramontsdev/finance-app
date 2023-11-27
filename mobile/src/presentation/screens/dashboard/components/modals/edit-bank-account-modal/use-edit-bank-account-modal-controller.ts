import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { bankAccountsService } from "../../../../../../infra/bank-accounts-service";
import { useDashboard } from "../../dashboard-context";

const schema = z.object({
  initialBalance: z.number({ invalid_type_error: 'Um valor a partir de zero' }),
  name: z.string().min(1, 'Digite o nome da conta'),
  type: z.enum(['INVESTMENT', 'CHECKING', 'CASH'], {
    required_error: 'Escolha o tipo da conta'
  })
});

type FormValues = z.infer<typeof schema>;

export function useEditBankAccountModalController() {
  const {
    isOpenEditBankAccountModal,
    bankAccountBeingEdited,
    openEditBankAccountModal,
    closeEditBankAccountModal
  } = useDashboard();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: bankAccountBeingEdited?.initialBalance,
      name: bankAccountBeingEdited?.name,
      type: bankAccountBeingEdited?.type
    }
  });

  function handleOpenDeleteModal() {
    setIsOpenDeleteModal(true);
  };
  function handleCloseDeleteModal() {
    setIsOpenDeleteModal(false);
  };

  const { mutateAsync } = useMutation(bankAccountsService.updateBankAccount);
  const queryClient = useQueryClient();

  const handleSubmit = hookFormSubmit(async values => {
    try {
      await mutateAsync({
        ...values,
        id: bankAccountBeingEdited?.id!,
        color: bankAccountBeingEdited?.color!,
      });

      queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
      closeEditBankAccountModal();

      Toast.show({
        type: 'success',
        text1: 'Conta editada com sucesso!'
      });

    } catch {
      Toast.show({
        type: 'error',
        text1: 'Houve um erro ao editar conta'
      });

      closeEditBankAccountModal();
    }
  });

  const { mutateAsync: deleteBankAccount } = useMutation(bankAccountsService.deleteBankAccount);

  async function handleConfirmDelete() {
    await deleteBankAccount(bankAccountBeingEdited?.id!);

    queryClient.invalidateQueries({ queryKey: ['bank-accounts'] });
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
    handleCloseDeleteModal();
    closeEditBankAccountModal();
  }

  return {
    isOpenEditBankAccountModal,
    openEditBankAccountModal,
    closeEditBankAccountModal,
    control,
    errors,
    handleSubmit,
    isOpenDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete
  };
};

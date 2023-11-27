import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
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

export function useAddBankAccountsController() {
  const { isOpenAddBankAccountModal, closeAddBankAccountModal } = useDashboard();

  const {
    control,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    resetField,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: 0,
      name: '',
    }
  });

  const { mutateAsync } = useMutation(bankAccountsService.addBankAccount);
  const queryClient = useQueryClient();

  const handleSubmit = hookFormSubmit(async (values) => {
    handleClose();

    try {
      await mutateAsync(Object.assign(values, { color: '#00ff00' }));

      queryClient.invalidateQueries(['bank-accounts']);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data)
    }
  });

  const handleClose = useCallback(() => {
    closeAddBankAccountModal();
    resetField('initialBalance');
    resetField('name');
    resetField('type');
  }, [])

  return {
    control,
    errors,
    handleSubmit,
    isOpenAddBankAccountModal,
    handleClose,
  }
}

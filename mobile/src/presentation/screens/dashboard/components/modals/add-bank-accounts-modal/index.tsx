import React from "react";
import { Controller } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";
import { Input } from "../../../../../components/input";
import { Modal } from "../../../../../components/modal";
import { SelectOption } from "../../select-option";
import { Button, Wrapper } from "./styles";
import { useAddBankAccountsController } from "./use-add-bank-accounts-controller";

const options = [
  {
    value: 'INVESTMENT',
    label: 'Investimento',
  },
  {
    value: 'CASH',
    label: 'Dinheiro físico',
  },
  {
    value: 'CHECKING',
    label: 'Corrente',
  },
]

export function AddBankAccountModal() {
  const {
    isOpenAddBankAccountModal,
    handleClose,
    control,
    errors,
    handleSubmit,
  } = useAddBankAccountsController();

  return (
    <Modal
      title="Nova conta"
      isOpen={isOpenAddBankAccountModal}
      onClose={handleClose}
    >
      <Wrapper>
        <Controller
          control={control}
          name="initialBalance"
          render={({ field: { value, onChange } }) => (
            <CurrencyInput
              value={value}
              onChangeValue={onChange}
              renderTextInput={props => (
                <Input
                  label="Saldo"
                  {...props}
                  errorMessage={errors.initialBalance?.message}
                />
              )}
              prefix="R$ "
              delimiter="."
              separator=","
              placeholder="R$ 0,00"
            />
          )}
        />

        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Nome da conta"
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <SelectOption
              label="Tipo"
              onSelect={onChange}
              options={options}
              value={value}
              errorMessage={errors.type?.message}
            />
          )}
        />

        <Button onPress={handleSubmit}>
          Salvar
        </Button>
      </Wrapper>
    </Modal>
  );
};

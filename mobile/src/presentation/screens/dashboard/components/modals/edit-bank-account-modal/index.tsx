import React from "react";
import { Controller } from "react-hook-form";
import { Pressable } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { TrashIcon } from "../../../../../components/icons/trash-icon";
import { Input } from "../../../../../components/input";
import { Modal } from "../../../../../components/modal";
import { SelectOption } from "../../select-option";
import { ConfirmDeleteModal } from "../confirm-delete-modal";
import { Button, Wrapper } from "./styles";
import { useEditBankAccountModalController } from "./use-edit-bank-account-modal-controller";

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

export function EditBankAccountModal() {
  const {
    isOpenEditBankAccountModal,
    closeEditBankAccountModal,
    control,
    errors,
    handleSubmit,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    isOpenDeleteModal,
    handleConfirmDelete
  } = useEditBankAccountModalController();

  if (isOpenDeleteModal) {
    return (
      <ConfirmDeleteModal
        title="Tem certeza que quer excluir?"
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    )
  }

  return (
    <Modal
      title="Editar conta"
      isOpen={isOpenEditBankAccountModal}
      onClose={closeEditBankAccountModal}
      rightIcon={
        <Pressable onPress={handleOpenDeleteModal}>
          <TrashIcon size={24} />
        </Pressable>
      }
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
                  darkColor
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
              darkColor
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
              darkColor
              label="Tipo"
              onSelect={onChange}
              options={options}
              value={options[options.findIndex(op => op.value == value)].label}
              errorMessage={errors.type?.message}
            />
          )}
        />

        <Button onPress={handleSubmit}>
          Salvar
        </Button>
      </Wrapper>
    </Modal>
  )
}

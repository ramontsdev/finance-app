import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import { Controller } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";
import { Input } from "../../../../../components/input";

import { Pressable } from 'react-native';
import { Transaction } from '../../../../../../models/transaction';
import { TrashIcon } from '../../../../../components/icons/trash-icon';
import { Modal } from "../../../../../components/modal";
import { formatDate } from '../../../../../utils/format-date';
import { DataDisplay } from "../../data-display";
import { SelectOption } from "../../select-option";
import { ConfirmDeleteModal } from '../confirm-delete-modal';
import { Button, Wrapper } from "./styles";
import { useEditTransactionModalController } from './use-edit-transaction-modal-controller';

type Props = {
  isOpen: boolean;
  onClose(): void;
  transaction: Transaction | null;
}
export function EditTransactionModal({ transaction, isOpen, onClose }: Props) {
  const {
    control,
    errors,
    handleSubmit,
    categories,
    bankAccounts,
    closeDatePicker,
    openDatePicker,
    isOpenDatePicker,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteTransaction
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        title='Tem certeza que quer excluir esta transação?'
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
      />
    )
  }

  return (
    <Modal
      title={isExpense ? 'Editar despesa' : 'Editar receita'}
      isOpen={isOpen}
      onClose={onClose}
      rightIcon={
        <Pressable onPress={handleOpenDeleteModal}>
          <TrashIcon size={24} />
        </Pressable>
      }
    >
      <Wrapper>
        <Controller
          control={control}
          name="value"
          render={({ field: { value, onChange } }) => (
            <CurrencyInput
              value={value}
              onChangeValue={onChange}
              renderTextInput={props => (
                <Input
                  label="Valor"
                  {...props}
                  errorMessage={errors.value?.message}
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
              label={isExpense ? 'Nome da despesa' : 'Nome da receita'}
              value={value}
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="categoryId"
          render={({ field: { value, onChange } }) => (
            <SelectOption
              label="Categoria"
              onSelect={onChange}
              options={categories.map(category => ({
                value: category.id,
                label: category.name,
              }))
              }
              value={categories[categories.findIndex(c => c.id == value)].name}
              errorMessage={errors.categoryId?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="bankAccountId"
          render={({ field: { value, onChange } }) => (
            <SelectOption
              label={isExpense ? 'Pagar com' : 'Receber com'}
              onSelect={onChange}
              options={bankAccounts.map(bankAccount => ({
                value: bankAccount.id,
                label: bankAccount.name,
              }))
              }
              value={bankAccounts[bankAccounts.findIndex(bk => bk.id == value)].name}
              errorMessage={errors.bankAccountId?.message}
            />
          )}
        />

        <Controller
          control={control}
          name='transactionDate'
          render={({ field: { onChange, value } }) => (
            <>
              <DataDisplay
                label='Data'
                onPress={openDatePicker}
                value={formatDate(value)}
              />

              {isOpenDatePicker && (
                <DateTimePicker
                  value={value}
                  mode='date'
                  is24Hour={true}
                  onChange={(dateEvent) => {
                    if (dateEvent.type === 'set') {
                      onChange(new Date(dateEvent.nativeEvent.timestamp));
                    }
                    closeDatePicker();
                  }}
                />
              )}
            </>
          )}
        />

        <Button onPress={handleSubmit}>
          Salvar
        </Button>
      </Wrapper>
    </Modal>
  );
};

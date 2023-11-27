import DateTimePicker from '@react-native-community/datetimepicker';
import React from "react";
import { Controller } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";
import { Input } from "../../../../../components/input";

import { Modal } from "../../../../../components/modal";
import { formatDate } from '../../../../../utils/format-date';
import { DataDisplay } from "../../data-display";
import { SelectOption } from "../../select-option";
import { Button, Wrapper } from "./styles";
import { useAddTransactionModalController } from "./use-add-transaction-modal-controller";

export function AddTransactionModal() {
  const {
    isOpenAddTransactionModal,
    handleCloseModal,
    control,
    errors,
    handleSubmit,
    categories,
    bankAccounts,
    newTransactionType,
    isOpenDatePicker,
    openDatePicker,
    closeDatePicker,
  } = useAddTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';

  return (
    <Modal
      title={isExpense ? 'Nova despesa' : 'Nova receita'}
      isOpen={isOpenAddTransactionModal}
      onClose={handleCloseModal}
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
              value={value}
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
              value={value}
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
                      closeDatePicker();
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

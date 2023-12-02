import { Modal } from "../../../../../components/modal";
import { SelectOption } from "../../select-option";
import { Actions, Button, Wrapper, YearWrap } from "./styles";
import { useFilterModalController } from "./use-filter-modal-controller";

import { TouchableOpacity } from "react-native";
import ChevronLeft from '../../../../../assets/chevron_left.svg';
import ChevronRight from '../../../../../assets/chevron_right.svg';
import { Text } from "../../../../../components/text";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters(filters: { bankAccountId?: string; year: number }): void;
};
export function FilterModal({ isOpen, onClose, onApplyFilters }: Props) {
  const {
    bankAccounts,
    handleSelectYear,
    selectedYear,
    handleSelectBankAccount,
    selectedBankAccountId,
    resetFilter,
  } = useFilterModalController();

  const bankAccountName = bankAccounts[bankAccounts.findIndex(account => (
    account.id === selectedBankAccountId
  ))]?.name;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Filtro"
    >
      <Wrapper>
        <SelectOption
          label="Banco"
          onSelect={(id) => handleSelectBankAccount(id)}
          value={bankAccountName && bankAccountName}
          options={bankAccounts.map(account => ({
            value: account.id,
            label: account.name
          }))}
        />

        <Text weight="600" size={18}>
          Ano
        </Text>

        <YearWrap>
          <TouchableOpacity onPress={() => handleSelectYear(-1)}>
            <ChevronLeft />
          </TouchableOpacity>

          <Text>
            {selectedYear}
          </Text>

          <TouchableOpacity onPress={() => handleSelectYear(1)}>
            <ChevronRight />
          </TouchableOpacity>
        </YearWrap>

        <Actions>
          <Button
            color="#ffffff"
            onPress={() => onApplyFilters({
              year: selectedYear,
              bankAccountId: selectedBankAccountId,
            })}
          >
            Filtrar
          </Button>

          <Button
            variant="ghost"
            onPress={() => {
              resetFilter();
              onApplyFilters({
                year: new Date().getFullYear(),
                bankAccountId: undefined,
              });
            }}
          >
            Remover filtros
          </Button>
        </Actions>
      </Wrapper>
    </Modal>
  );
};

import { TransactionTypeButton } from './transaction-type-button';

type Props = {
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void;
  selectedType?: 'INCOME' | 'EXPENSE';
}

export function SelectTransactionTypeButtons({ onSelect, selectedType }: Props) {
  function handleSelect(type: 'INCOME' | 'EXPENSE') {
    if (type !== selectedType) onSelect(type);
    else onSelect(undefined);
  }

  return (
    <div className="flex gap-2">
      <TransactionTypeButton
        selectedType={selectedType}
        type="EXPENSE"
        label="Despesas"
        onClick={() => handleSelect('EXPENSE')}
      />

      <TransactionTypeButton
        selectedType={selectedType}
        type="INCOME"
        label="Receitas"
        onClick={() => handleSelect('INCOME')}
      />
    </div>
  );
}

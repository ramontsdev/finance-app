import { ExpensesIcon } from '../../../../../components/icons/ExpensesIcon';
import { IncomeIcon } from '../../../../../components/icons/IncomeIcon';
import { Text } from '../../../../../components/text';
import { ExpenseButton, IncomeButton, Wrapper } from './styles';

type Props = {
  onChange: (type: 'INCOME' | 'EXPENSE' | undefined) => void;
  selectedType?: 'INCOME' | 'EXPENSE';
}

export function SelectTransactionTypeButtons({ selectedType, onChange }: Props) {
  function handleChange(type: 'INCOME' | 'EXPENSE') {
    if (type === selectedType) return onChange(undefined);

    return onChange(type);
  }

  return (
    <Wrapper>
      <IncomeButton
        style={[selectedType === 'EXPENSE' && { opacity: 0.4 }]}
        onPress={() => handleChange('INCOME')}
      >
        <IncomeIcon />
        <Text color='#252525'>Receitas</Text>
      </IncomeButton>

      <ExpenseButton
        style={[selectedType === 'INCOME' && { opacity: 0.4 }]}
        onPress={() => handleChange('EXPENSE')}
      >
        <ExpensesIcon />
        <Text color='#252525'>Despesas</Text>
      </ExpenseButton>
    </Wrapper>
  );
}

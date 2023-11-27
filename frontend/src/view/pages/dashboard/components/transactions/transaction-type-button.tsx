import { cn } from '../../../../../app/utils/cn';
import { ExpensesIcon } from '../../../../components/icons/ExpensesIcon';
import { IncomeIcon } from '../../../../components/icons/IncomeIcon';

export type Props = {
  label: string;
  type: 'INCOME' | 'EXPENSE';
  selectedType?: 'INCOME' | 'EXPENSE';
  onClick?: () => void;
};

export function TransactionTypeButton({
  label, type, selectedType, onClick,
}: Props) {
  const expenseStyle = cn(
    'flex gap-2 justify-center items-center px-3 h-8 rounded-lg bg-red-500 hover:bg-red-500/90 active:bg-red-500 transition-opacity text-semibold',
    (selectedType && selectedType !== type) && 'bg-red-500/50 hover:bg-red-500/80 active:bg-red-500',
    selectedType === type && 'bg-red-600',
  );

  const incomeStyle = cn(
    'flex gap-2 justify-center items-center px-3 h-8 rounded-lg bg-green-500 hover:bg-green-500/90 active:bg-green-500 transition-opacity text-semibold transition-colors',
    (selectedType && selectedType !== type) && 'bg-green-500/50 hover:bg-green-500/80 active:bg-green-500',
    selectedType === type && 'bg-green-600',
  );

  return (
    <button className={type === 'INCOME' ? incomeStyle : expenseStyle} onClick={onClick}>
      {type === 'EXPENSE' && <IncomeIcon />}
      {type === 'INCOME' && <ExpensesIcon />}
      {label}
    </button>
  );
}

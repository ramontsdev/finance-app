import { BankAccount } from '../../../../../app/entities/bank-account';
import { cn } from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/format-currency';
import { BankAccountTypeIcon } from '../../../../components/icons/bank-account-type-icon';
import { useDashboard } from '../dashboard-context/useDashboard';

type AccountCardProps = {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const {
    color, name, currentBalance, type,
  } = data;
  const { areValuesVisible, openEditAccountModal } = useDashboard();

  return (
    <div
      className="bg-white h-32 flex flex-col p-2 rounded-2xl justify-between border-b-4 border-teal-950"
      style={{ borderColor: color }}
      role="button"
      onClick={() => openEditAccountModal(data)}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-bold tracking-[-0.5px] mt-1 block">
          {name}
        </span>
      </div>

      <div className="flex flex-col">
        <span
          className={cn(
            'text-gray-800 font-semibold tracking-[-0.5px] text-sm',
            !areValuesVisible && 'blur-sm',
          )}
        >
          {formatCurrency(currentBalance)}
        </span>
        <small className="text-gray-800 text-xs">
          Saldo atual
        </small>
      </div>
    </div>
  );
}

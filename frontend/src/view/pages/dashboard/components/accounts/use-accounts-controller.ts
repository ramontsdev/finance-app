import { useMemo, useState } from 'react';

import { useBankAccounts } from '../../../../../app/hooks/use-bank-accounts';
import { useWindowWidth } from '../../../../../app/hooks/use-window-width';
import { useDashboard } from '../dashboard-context/useDashboard';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(
    () => accounts.reduce((total, account) => total + account.currentBalance, 0),
    [accounts],
  );

  return {
    sliderState,
    setSliderState,
    windowWidth,
    toggleValuesVisibility,
    areValuesVisible,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance,
  };
}

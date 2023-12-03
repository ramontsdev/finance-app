import { View } from "react-native";
import { BankAccount } from "../../../../../../models/bank-account";
import { BankAccountTypeIcon } from "../../../../../components/icons/bank-account-type-icon";
import { formatCurrency } from "../../../../../utils/format-currency";
import { useDashboard } from "../../dashboard-context";
import { Balance, BankAccountName, TextSmall, Wrapper } from "./styles";

type Props = {
  bankAccount: BankAccount
  onPress: () => void;
}
export function BankAccountCard({ bankAccount, onPress }: Props) {
  const { areValuesVisible } = useDashboard();

  return (
    <Wrapper
      onPress={onPress}
      style={({ pressed }) => (
        [pressed && { transform: [{ scale: 0.97 }] },
        { borderBottomColor: bankAccount.color }]
      )}
    >
      <View>
        <BankAccountTypeIcon size={40} type={bankAccount.type} />

        <BankAccountName>
          {bankAccount.name}
        </BankAccountName>
      </View>

      <View>
        <Balance>
          {areValuesVisible && formatCurrency(bankAccount.currentBalance)}
          {!areValuesVisible && 'R$ * * * * *'}
        </Balance>

        <TextSmall>
          Saldo
        </TextSmall>
      </View>
    </Wrapper>
  )
}

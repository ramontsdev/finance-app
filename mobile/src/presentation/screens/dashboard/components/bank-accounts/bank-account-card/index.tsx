import { View } from "react-native";
import { BankAccount } from "../../../../../../models/bank-account";
import { BankAccountTypeIcon } from "../../../../../components/icons/bank-account-type-icon";
import { formatCurrency } from "../../../../../utils/format-currency";
import { Balance, BankAccountName, TextSmall, Wrapper } from "./styles";

type Props = {
  bankAccount: BankAccount
  onPress: () => void;
}
export function BankAccountCard({ bankAccount, onPress }: Props) {
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
          {formatCurrency(bankAccount.currentBalance)}
        </Balance>

        <TextSmall>
          Saldo
        </TextSmall>
      </View>
    </Wrapper>
  )
}

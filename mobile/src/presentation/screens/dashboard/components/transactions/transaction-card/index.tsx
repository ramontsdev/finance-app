import React from "react";
import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { Transaction } from "../../../../../../models/transaction";
import { CategoryIcon } from "../../../../../components/icons/categories/CategoryIcon";
import { formatCurrency } from "../../../../../utils/format-currency";
import { formatDate } from "../../../../../utils/format-date";
import { useDashboard } from "../../dashboard-context";
import { TransactionAmount, TransactionDate, TransactionLeftSideCard, TransactionName, Wrapper } from "./styles";

type Props = {
  transaction: Transaction;
  onPress?: () => void;
};
export function TransactionCard({ transaction, onPress }: Props) {
  const { colors } = useTheme();
  const { areValuesVisible } = useDashboard();

  return (
    <Wrapper
      onPress={onPress}
      style={({ pressed }) => pressed && { transform: [{ scale: 0.97 }] }}
    >
      <TransactionLeftSideCard>
        <CategoryIcon
          type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
          category={transaction.category?.icon}
        />
        <View>
          <TransactionName>
            {transaction.name}
          </TransactionName>

          <TransactionDate>
            {formatDate(new Date(transaction.date))}
          </TransactionDate>
        </View>
      </TransactionLeftSideCard>

      <TransactionAmount
        color={transaction.type === 'EXPENSE' ? colors.danger.default : '#10d610'}
      >
        {transaction.type === 'EXPENSE' && (
          areValuesVisible
            ? `- ${formatCurrency(transaction.value)}`
            : `- R$ * * * *`
        )}
        {transaction.type === 'INCOME' && (
          areValuesVisible
            ? `+ ${formatCurrency(transaction.value)}`
            : `+ R$ * * * *`
        )}
      </TransactionAmount>
    </Wrapper>
  )
}

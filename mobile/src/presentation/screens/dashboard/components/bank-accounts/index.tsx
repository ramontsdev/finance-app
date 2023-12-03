import React from "react";
import { FlatList, View } from "react-native";
import { Loading } from "../../../../components/loading";
import { BankAccountCard } from "./bank-account-card";
import { AccountsWrapper, AddBankAccountButton, Container, IconWrap, Title, TotalBalance, TotalBalanceTitle, TotalBalanceWrap } from "./styles";
import { useBankAccountsController } from "./use-bank-accounts-controller";

import { Text } from "../../../../components/text";
import { formatCurrency } from "../../../../utils/format-currency";
import PlusIcon from '../fab/plus_icon.svg';

export function BankAccounts() {
  const {
    bankAccounts,
    isFetching,
    openEditBankAccountModal,
    openAddBankAccountModal,
    currentBalance
  } = useBankAccountsController();

  const hasBankAccounts = bankAccounts.length > 0;

  return (
    <Container>
      <TotalBalanceWrap>
        <TotalBalanceTitle>
          Saldo total
        </TotalBalanceTitle>

        <TotalBalance>
          {formatCurrency(currentBalance)}
        </TotalBalance>
      </TotalBalanceWrap>

      <View>
        <Title>
          Minhas contas
        </Title>

        <AccountsWrapper>
          {(!hasBankAccounts && !isFetching) && (
            <AddBankAccountButton onPress={openAddBankAccountModal}>
              <IconWrap>
                <PlusIcon />
              </IconWrap>

              <Text color="white">
                Adicionar uma conta
              </Text>
            </AddBankAccountButton>
          )}

          {isFetching
            ? (<Loading />)
            : (
              <FlatList
                horizontal
                data={bankAccounts}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: bankAccount }) => (
                  <BankAccountCard
                    bankAccount={bankAccount}
                    onPress={() => openEditBankAccountModal(bankAccount)}
                  />
                )}
                style={{ paddingBottom: 8 }}
                contentContainerStyle={{ gap: 8 }}
              />
            )
          }
        </AccountsWrapper>
      </View>
    </Container>
  );
};

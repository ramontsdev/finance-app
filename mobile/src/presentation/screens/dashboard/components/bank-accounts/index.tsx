import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { BankAccountCard } from "./bank-account-card";
import { AccountsWrapper, AddBankAccountButton, Container, IconWrap, Title, TotalBalance, TotalBalanceTitle, TotalBalanceWrap } from "./styles";
import { useBankAccountsController } from "./use-bank-accounts-controller";

import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { Text } from "../../../../components/text";
import { formatCurrency } from "../../../../utils/format-currency";
import PlusIcon from '../fab/plus_icon.svg';
import { Loading } from "./loading";

export function BankAccounts() {
  const {
    bankAccounts,
    isFetching,
    openEditBankAccountModal,
    openAddBankAccountModal,
    currentBalance,
    toggleValuesVisibility,
    areValuesVisible
  } = useBankAccountsController();

  const hasBankAccounts = bankAccounts.length > 0;

  return (
    <Container>
      <TotalBalanceWrap>
        <TotalBalanceTitle>
          Saldo total
        </TotalBalanceTitle>

        <TotalBalance>
          {areValuesVisible && formatCurrency(currentBalance)}
          {!areValuesVisible && 'R$ * * * *'}
        </TotalBalance>

        <TouchableOpacity
          onPress={toggleValuesVisibility}
          hitSlop={{ left: 5, top: 5, right: 5, bottom: 5, }}
        >
          <EyeIcon open={!areValuesVisible} size={24} />
        </TouchableOpacity>
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

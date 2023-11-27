import React from "react";
import { FlatList } from "react-native";
import { BankAccountCard } from "./bank-account-card";
import { Loading } from "./loading";
import { AccountsWrapper, AddBankAccountButton, Container, IconWrap, Title } from "./styles";
import { useBankAccountsController } from "./use-bank-accounts-controller";

import { Text } from "../../../../components/text";
import PlusIcon from '../fab/plus_icon.svg';

export function BankAccounts() {
  const {
    bankAccounts,
    isFetching,
    openEditBankAccountModal,
    openAddBankAccountModal
  } = useBankAccountsController();

  const hasBankAccounts = bankAccounts.length > 0;

  return (
    <Container>
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
    </Container>
  );
};

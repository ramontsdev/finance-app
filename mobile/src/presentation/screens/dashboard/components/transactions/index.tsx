import { FlatList } from "react-native";
import { Loading } from "../bank-accounts/loading";
import { EditTransactionModal } from "../modals/edit-transaction-modal";
import { EmptyTransactions } from "./empty-transactions";
import { FilterTrigger } from "./filter-trigger";
import { SelectMonth } from "./select-month";
import { SelectTransactionTypeButtons } from "./select-transaction-type-buttons";
import { FiltersWrapper, Header, TransactionsWrapper, Wrapper } from "./styles";
import { TransactionCard } from "./transaction-card";
import { useTransactionsController } from "./use-transactions-controller";

export function TransactionsSide() {
  const {
    handleChangeFilters,
    filters,
    isLoading,
    transactions,
    isOpenEditTransactionModal,
    openEditTransactionModal,
    closeEditTransactionModal,
    transactionBeingEdited
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <Wrapper>
      <Header>
        <FiltersWrapper>
          <SelectTransactionTypeButtons
            onChange={handleChangeFilters('type')}
            selectedType={filters.type}
          />
          <FilterTrigger />
        </FiltersWrapper>

        <SelectMonth
          selectedMonth={filters.month}
          onChange={(month) => handleChangeFilters('month')(month)}
        />
      </Header>

      <TransactionsWrapper>
        {isLoading && (
          <Loading />
        )}

        {(!hasTransactions && !isLoading) && (
          <EmptyTransactions />
        )}

        {(hasTransactions && !isLoading) && (
          <>
            {transactionBeingEdited && (
              <EditTransactionModal
                isOpen={isOpenEditTransactionModal}
                onClose={closeEditTransactionModal}
                transaction={transactionBeingEdited}
              />
            )}

            < FlatList
              contentContainerStyle={{
                gap: 8,
                paddingHorizontal: 16,
                paddingTop: 8,
                paddingBottom: 8,
              }}
              data={transactions}
              renderItem={({ item: transaction }) => (
                <TransactionCard
                  transaction={transaction}
                  onPress={() => openEditTransactionModal(transaction)}
                />
              )}
            />
          </>
        )}
      </TransactionsWrapper>
    </Wrapper>
  )
}

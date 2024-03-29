import { FlatList } from "react-native";
import { EditTransactionModal } from "../modals/edit-transaction-modal";
import { EmptyTransactions } from "./empty-transactions";
import { FilterModal } from "./filter-modal";
import { FilterTrigger } from "./filter-trigger";
import { Loading } from "./loading";
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
    transactionBeingEdited,
    openFilterModal,
    closeFilterModal,
    isFilterModalOpen,
    handleApplyFilters
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

          <FilterTrigger onPress={openFilterModal} />
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

        <FilterModal
          onClose={closeFilterModal}
          isOpen={isFilterModalOpen}
          onApplyFilters={handleApplyFilters}
        />

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
  );
};

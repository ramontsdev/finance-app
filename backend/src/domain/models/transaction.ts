export type TransactionType = 'INCOME' | 'EXPENSE';

export type Transaction = {
  id: string;
  bankAccountId: string;
  categoryId: string | null;
  userId: string;
  name: string;
  value: number;
  date: Date;
  type: TransactionType;
};

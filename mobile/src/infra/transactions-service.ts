import { httpClient } from '../infra/http-client';

export type Transaction = {
  id: string;
  name: string;
  categoryId: string;
  bankAccountId: string;
  value: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  category?: {
    id: string;
    name: string;
    icon: string;
  };
}

export type TransactionFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
}

async function loadTransactions(filters: TransactionFilters) {
  const { data } = await httpClient.get<Transaction[]>('/transactions', {
    params: filters,
  });

  return data;
}

export type TransactionParams = {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
}

export async function create(params: TransactionParams) {
  const { data } = await httpClient.post('/transactions', params);

  return data;
}

export type UpdateTransactionParams = {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
}

async function updateTransaction({ id, ...params }: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}

async function deleteTransaction(id: string) {
  const { data } = await httpClient.delete(`/transactions/${id}`);

  return data;
}

export const transactionsService = {
  loadTransactions,
  create,
  updateTransaction,
  deleteTransaction
};

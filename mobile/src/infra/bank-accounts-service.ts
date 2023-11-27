import { BankAccount } from "../models/bank-account";
import { httpClient } from "./http-client";

type Params = {
  initialBalance: number;
  type: 'INVESTMENT' | 'CHECKING' | 'CASH';
  name: string;
  color: string;
}

async function addBankAccount(params: Params) {
  const { data } = await httpClient.post('/bank-accounts', params);

  return data;
};

async function loadBankAccounts() {
  const { data } = await httpClient.get<BankAccount[]>('/bank-accounts');

  return data
}

export type UpdateBankAccountParams = {
  id: string;
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

async function updateBankAccount({ id, ...params }: UpdateBankAccountParams) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

  return data;
}

async function deleteBankAccount(id: string) {
  const { data } = await httpClient.delete(`/bank-accounts/${id}`);

  return data;
}


export const bankAccountsService = {
  addBankAccount,
  loadBankAccounts,
  updateBankAccount,
  deleteBankAccount
}

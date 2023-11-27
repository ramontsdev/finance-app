import { BankAccount } from '../../../../domain/models/bank-account';
import { ILoadBankAccounts } from '../../../../domain/use-cases/bank-account/load-bank-accounts';
import { prismaClient } from '../../postgres-db';

export class DbLoadBankAccounts implements ILoadBankAccounts {
  load(userId: string): Promise<BankAccount[]> {
    return prismaClient.bankAccount.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            value: true,
            type: true,
          },
        },
      },
    });
  }
}

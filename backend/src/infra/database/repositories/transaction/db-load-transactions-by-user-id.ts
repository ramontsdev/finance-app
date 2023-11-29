import { Transaction } from '../../../../domain/models/transaction';
import {
  ILoadTransactionsByUserId,
  TransactionsFilter,
} from '../../../../domain/use-cases/transaction/load-transactions-by-user-id';
import { prismaClient } from '../../postgres-db';

export class DbLoadTransactionsByUserId implements ILoadTransactionsByUserId {
  loadAll(userId: string, filters: TransactionsFilter): Promise<Transaction[]> {
    return prismaClient.transaction.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(Number(filters.year), Number(filters.month))),
          lt: new Date(Date.UTC(Number(filters.year), Number(filters.month) + 1)),
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }
}

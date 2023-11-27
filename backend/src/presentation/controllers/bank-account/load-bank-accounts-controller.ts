import { ILoadBankAccounts } from '../../../domain/use-cases/bank-account/load-bank-accounts';
import { notFound, ok } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class LoadBankAccountsController implements IController {
  constructor(
    private readonly loadUserByRequest: LoadUserByRequest,
    private readonly loadBankAccounts: ILoadBankAccounts,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = await this.loadUserByRequest.loadUser(httpRequest);

    if (!user) return notFound();

    const bankAccounts = await this.loadBankAccounts.load(user.id);

    const bankAccountsWithCurrentBalance = bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc + (transaction.type === 'INCOME' ? transaction.value : -transaction.value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
      };
    });

    return ok(bankAccountsWithCurrentBalance);
  }
}

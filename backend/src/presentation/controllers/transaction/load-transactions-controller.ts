import { ILoadTransactionsByUserId } from '../../../domain/use-cases/transaction/load-transactions-by-user-id';
import { notFound, ok, serverError } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class LoadTransactionsController implements IController {
  constructor(
    private readonly loadUserByRequest: LoadUserByRequest,
    private readonly loadTransactionsByUserId: ILoadTransactionsByUserId,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const user = await this.loadUserByRequest.loadUser(httpRequest);
      if (!user) return notFound();

      const { month, year, bankAccountId, type } = httpRequest.query;

      const transactions = await this.loadTransactionsByUserId.loadAll(user.id, {
        year,
        month,
        bankAccountId,
        type,
      });

      return ok(transactions);
    } catch (err) {
      const error = err as Error;
      console.error(error.message);

      return serverError();
    }
  }
}

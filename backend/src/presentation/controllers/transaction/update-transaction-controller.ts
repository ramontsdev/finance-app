import { IUpdateTransaction } from '../../../domain/use-cases/transaction/update-transaction';
import { ok, unauthorized } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class UpdateTransactionController implements IController {
  constructor(
    private readonly loadUserByRequest: LoadUserByRequest,
    private readonly updateTransaction: IUpdateTransaction,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = await this.loadUserByRequest.loadUser(httpRequest);
    if (!user) return unauthorized();

    const { bankAccountId, categoryId, name, value, date, type } = httpRequest.body;

    const { transactionId } = httpRequest.params;

    const transactionUpdated = await this.updateTransaction.update(transactionId, {
      bankAccountId,
      categoryId,
      name,
      value,
      date,
      type,
      userId: user.id,
    });

    return ok(transactionUpdated);
  }
}

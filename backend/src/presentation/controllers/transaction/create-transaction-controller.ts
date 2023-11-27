import { ICreateTransaction } from '../../../domain/use-cases/transaction/create-transaction';
import { ok, unauthorized } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class CreateTransactionController implements IController {
  constructor(
    private readonly loadUserByRequest: LoadUserByRequest,
    private readonly createTransaction: ICreateTransaction,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = await this.loadUserByRequest.loadUser(httpRequest);
    if (!user) return unauthorized();

    const { bankAccountId, categoryId, name, value, date, type } = httpRequest.body;

    const transaction = await this.createTransaction.create({
      bankAccountId,
      categoryId,
      name,
      value,
      date,
      type,
      userId: user.id,
    });

    return ok(transaction);
  }
}

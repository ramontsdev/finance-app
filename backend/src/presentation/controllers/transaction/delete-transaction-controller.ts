import { IDeleteTransaction } from '../../../domain/use-cases/transaction/delete-transaction';
import { noContent, unauthorized } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class DeleteTransactionController implements IController {
  constructor(
    private readonly loadUserByRequest: LoadUserByRequest,
    private readonly deleteTransaction: IDeleteTransaction,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { transactionId } = httpRequest.params;

    const user = await this.loadUserByRequest.loadUser(httpRequest);
    if (!user) return unauthorized();

    await this.deleteTransaction.delete(transactionId);

    return noContent();
  }
}

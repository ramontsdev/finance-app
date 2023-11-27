import { IDeleteBankAccount } from '../../../domain/use-cases/bank-account/delete-bank-account';
import { noContent, unauthorized } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class DeleteBankAccountController implements IController {
  constructor(
    private readonly loadUserByRequest: LoadUserByRequest,
    private readonly deleteBankAccount: IDeleteBankAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = await this.loadUserByRequest.loadUser(httpRequest);
    if (!user) return unauthorized();

    const { bankAccountId } = httpRequest.params;

    await this.deleteBankAccount.delete(bankAccountId);

    return noContent();
  }
}

import { IUpdateBankAccount } from '../../../domain/use-cases/bank-account/update-bank-account';
import { ok, unauthorized } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class UpdateBankAccountController implements IController {
  constructor(
    private readonly loadUserByRequest: LoadUserByRequest,
    private readonly updateBankAccount: IUpdateBankAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = await this.loadUserByRequest.loadUser(httpRequest);
    if (!user) return unauthorized();

    const { bankAccountId } = httpRequest.params;

    const { name, initialBalance, color, type } = httpRequest.body;

    const updatedBankAccount = await this.updateBankAccount.update(bankAccountId, {
      name,
      initialBalance,
      color,
      type,
      userId: user.id,
    });

    return ok(updatedBankAccount);
  }
}

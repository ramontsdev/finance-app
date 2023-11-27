import { ICreateBankAccount } from '../../../domain/use-cases/bank-account/create-bank-account';
import { badRequest, ok, unauthorized } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class CreateBankAccountController implements IController {
  constructor(
    private readonly loadUserByRequest: LoadUserByRequest,
    private readonly createBankAccount: ICreateBankAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = await this.loadUserByRequest.loadUser(httpRequest);
    if (!user) return unauthorized();

    const requiredFields = ['name', 'initialBalance', 'type'];
    for await (const field of requiredFields)
      if (!httpRequest.body[field]) return badRequest({ error: `${field} is required.` });

    const { name, initialBalance, type, color } = httpRequest.body;

    const bankAccount = await this.createBankAccount.create({
      name,
      initialBalance,
      color,
      type,
      userId: user.id,
    });

    return ok(bankAccount);
  }
}

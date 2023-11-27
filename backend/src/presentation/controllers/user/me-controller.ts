import { ok, unauthorized } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class MeController implements IController {
  constructor(private readonly loadUserByRequest: LoadUserByRequest) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const member = await this.loadUserByRequest.loadUser(httpRequest);
    if (!member) return unauthorized();

    return ok({ ...member, password: undefined });
  }
}

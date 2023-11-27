import { IEncrypter } from '../../../domain/use-cases/cryptography/encrypter';
import { IHashComparer } from '../../../domain/use-cases/cryptography/hash-comparer';
import { IFindUserByEmail } from '../../../domain/use-cases/user/find-user-by-email';
import { badRequest, notFound, ok, serverError, unauthorized } from '../../helpers/http-helpers';
import { IController } from '../../protocols/controller';
import { IEmailValidator } from '../../protocols/email-validator';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class SignInController implements IController {
  constructor(
    private readonly emailValidador: IEmailValidator,
    private readonly findUserByEmail: IFindUserByEmail,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password'];
      for await (const field of requiredFields)
        if (!httpRequest.body[field]) return badRequest({ error: `${field} is required.` });

      const { email, password } = httpRequest.body;

      const isValidEmail = this.emailValidador.isValid(email);
      if (!isValidEmail) return badRequest({ error: 'Invalid e-mail.' });

      const user = await this.findUserByEmail.findByEmail(email);
      if (!user) return notFound({ error: 'E-mail not found.' });

      const isValidPassword = await this.hashComparer.compare(password, user.password);
      if (!isValidPassword) return unauthorized({ error: 'Incorrect password.' });

      const accessToken = this.encrypter.encrypt(user.id);

      return ok({ accessToken });
    } catch (err) {
      const error = err as Error;
      console.log(error.message);

      return serverError();
    }
  }
}

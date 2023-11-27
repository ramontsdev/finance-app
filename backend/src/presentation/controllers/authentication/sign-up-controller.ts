import { IEncrypter } from '../../../domain/use-cases/cryptography/encrypter';
import { ICreateUser } from '../../../domain/use-cases/user/create-user';
import { IFindUserByEmail } from '../../../domain/use-cases/user/find-user-by-email';
import { badRequest, conflict, ok, serverError } from '../../helpers/http-helpers';
import { IController } from '../../protocols/controller';
import { IEmailValidator } from '../../protocols/email-validator';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class SignUpController implements IController {
  constructor(
    private readonly emailValidador: IEmailValidator,
    private readonly findUserByEmail: IFindUserByEmail,
    private readonly createUser: ICreateUser,
    private readonly encrypter: IEncrypter,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword'];
      for await (const field of requiredFields)
        if (!httpRequest.body[field]) return badRequest({ error: `${field} is required.` });

      const { name, email, password, confirmPassword } = httpRequest.body;

      const isValidEmail = this.emailValidador.isValid(email);
      if (!isValidEmail) return badRequest({ error: 'Invalid e-mail.' });

      if (password !== confirmPassword) return badRequest({ error: 'Passwords do not match' });

      const user = await this.findUserByEmail.findByEmail(email);
      if (user) return conflict({ error: 'E-mail already exists' });

      const newUser = await this.createUser.create({
        name,
        email,
        password,
      });

      const accessToken = this.encrypter.encrypt(newUser.id);

      return ok({ accessToken });
    } catch (err) {
      const error = err as Error;
      console.log(error.message);

      return serverError();
    }
  }
}

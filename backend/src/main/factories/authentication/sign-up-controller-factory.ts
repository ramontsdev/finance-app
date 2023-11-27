import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbCreateUser } from '../../../infra/database/repositories/user/db-create-user';
import { DbFindUserByEmail } from '../../../infra/database/repositories/user/db-find-user-by-email';
import { SignUpController } from '../../../presentation/controllers/authentication/sign-up-controller';
import { BcryptAdapter } from '../../adapters/bcrypt-adapter';
import { EmailValidatorAdapter } from '../../adapters/email-validator-adapter';

export function makeSignUpController(): SignUpController {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const dbFindUserByEmail = new DbFindUserByEmail();
  const jwtAdapter = new JwtAdapter();

  const bcryptAdapter = new BcryptAdapter(12);
  const dbCreateUser = new DbCreateUser(bcryptAdapter);

  return new SignUpController(emailValidatorAdapter, dbFindUserByEmail, dbCreateUser, jwtAdapter);
}

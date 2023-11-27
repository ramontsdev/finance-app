import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbFindUserByEmail } from '../../../infra/database/repositories/user/db-find-user-by-email';
import { SignInController } from '../../../presentation/controllers/authentication/sign-in-controller';
import { BcryptAdapter } from '../../adapters/bcrypt-adapter';
import { EmailValidatorAdapter } from '../../adapters/email-validator-adapter';

export function makeSignInController(): SignInController {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const dbFindMemberByEmail = new DbFindUserByEmail();
  const jwtAdapter = new JwtAdapter();
  const bcryptAdapter = new BcryptAdapter(12);

  return new SignInController(emailValidatorAdapter, dbFindMemberByEmail, bcryptAdapter, jwtAdapter);
}

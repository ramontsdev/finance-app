import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbLoadBankAccounts } from '../../../infra/database/repositories/bank-account/db-load-bank-accounts';
import { DbFindUserById } from '../../../infra/database/repositories/user/db-find-user-by-id';
import { LoadBankAccountsController } from '../../../presentation/controllers/bank-account/load-bank-accounts-controller';
import { LoadUserByRequest } from '../../../presentation/helpers/load-user-by-request';

export function makeLoadBankAccountsController(): LoadBankAccountsController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindUserById();
  const loadMemberFromRequest = new LoadUserByRequest(jwtAdapter, dbFindMemberById);

  const dbLoadBankAccounts = new DbLoadBankAccounts();

  return new LoadBankAccountsController(loadMemberFromRequest, dbLoadBankAccounts);
}

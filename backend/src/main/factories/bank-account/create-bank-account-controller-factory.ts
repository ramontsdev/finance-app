import { DbCreateBankAccount } from '../../../infra/database/repositories/bank-account/db-create-bank-account';
import { CreateBankAccountController } from '../../../presentation/controllers/bank-account/create-bank-account-controller';
import { makeLoadUserByRequest } from '../helpers/load-user-by-request-factory';

export function makeCreateBankAccountController(): CreateBankAccountController {
  const loadUserByRequest = makeLoadUserByRequest();

  const dbCreateBankAccount = new DbCreateBankAccount();

  return new CreateBankAccountController(loadUserByRequest, dbCreateBankAccount);
}

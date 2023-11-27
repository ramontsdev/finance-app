import { DbDeleteBankAccount } from '../../../infra/database/repositories/bank-account/db-delete-bank-account';
import { DeleteBankAccountController } from '../../../presentation/controllers/bank-account/delete-bank-account-controller';
import { makeLoadUserByRequest } from '../helpers/load-user-by-request-factory';

export function makeDeleteBankAccountController(): DeleteBankAccountController {
  const loadUserByRequest = makeLoadUserByRequest();
  const dbDeleteBankAccount = new DbDeleteBankAccount();

  return new DeleteBankAccountController(loadUserByRequest, dbDeleteBankAccount);
}

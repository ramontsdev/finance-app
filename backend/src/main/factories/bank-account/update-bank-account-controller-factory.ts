import { DbUpdateBankAccount } from '../../../infra/database/repositories/bank-account/db-update-bank-account';
import { UpdateBankAccountController } from '../../../presentation/controllers/bank-account/update-bank-account-controller';
import { makeLoadUserByRequest } from '../helpers/load-user-by-request-factory';

export function makeUpdateBankAccount(): UpdateBankAccountController {
  const loadUserByRequest = makeLoadUserByRequest();
  const dbUpdateBankAccount = new DbUpdateBankAccount();

  return new UpdateBankAccountController(loadUserByRequest, dbUpdateBankAccount);
}

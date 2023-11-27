import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbUpdateTransaction } from '../../../infra/database/repositories/transaction/db-update-transaction';
import { DbFindUserById } from '../../../infra/database/repositories/user/db-find-user-by-id';
import { UpdateTransactionController } from '../../../presentation/controllers/transaction/update-transaction-controller';
import { LoadUserByRequest } from '../../../presentation/helpers/load-user-by-request';

export function makeUpdateTransactionController(): UpdateTransactionController {
  const dbFindMemberById = new DbFindUserById();
  const jwtAdapter = new JwtAdapter();
  const loadUserByRequest = new LoadUserByRequest(jwtAdapter, dbFindMemberById);

  const dbUpdateTransaction = new DbUpdateTransaction();

  return new UpdateTransactionController(loadUserByRequest, dbUpdateTransaction);
}

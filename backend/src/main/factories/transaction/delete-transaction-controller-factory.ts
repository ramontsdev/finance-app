import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbDeleteTransaction } from '../../../infra/database/repositories/transaction/db-delete-transaction';
import { DbFindUserById } from '../../../infra/database/repositories/user/db-find-user-by-id';
import { DeleteTransactionController } from '../../../presentation/controllers/transaction/delete-transaction-controller';
import { LoadUserByRequest } from '../../../presentation/helpers/load-user-by-request';

export function makeDeleteTransactionController(): DeleteTransactionController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindUserById();
  const loadUserByRequest = new LoadUserByRequest(jwtAdapter, dbFindMemberById);

  const dbDeleteTransaction = new DbDeleteTransaction();

  return new DeleteTransactionController(loadUserByRequest, dbDeleteTransaction);
}

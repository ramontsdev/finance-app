import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbCreateTransaction } from '../../../infra/database/repositories/transaction/db-create-transaction';
import { DbFindUserById } from '../../../infra/database/repositories/user/db-find-user-by-id';
import { CreateTransactionController } from '../../../presentation/controllers/transaction/create-transaction-controller';
import { LoadUserByRequest } from '../../../presentation/helpers/load-user-by-request';

export function makeCreateTransactionController(): CreateTransactionController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindUserById();
  const loadUserByRequest = new LoadUserByRequest(jwtAdapter, dbFindMemberById);

  const dbCreateTransaction = new DbCreateTransaction();

  return new CreateTransactionController(loadUserByRequest, dbCreateTransaction);
}

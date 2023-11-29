import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbLoadTransactionsByUserId } from '../../../infra/database/repositories/transaction/db-load-transactions-by-user-id';
import { DbFindUserById } from '../../../infra/database/repositories/user/db-find-user-by-id';
import { LoadTransactionsController } from '../../../presentation/controllers/transaction/load-transactions-controller';
import { LoadUserByRequest } from '../../../presentation/helpers/load-user-by-request';

export function makeLoadTransactionsController(): LoadTransactionsController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindUserById();
  const loadUserByRequest = new LoadUserByRequest(jwtAdapter, dbFindMemberById);

  const dbLoadTransactionsByUserId = new DbLoadTransactionsByUserId();

  return new LoadTransactionsController(loadUserByRequest, dbLoadTransactionsByUserId);
}

import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbFindUserById } from '../../../infra/database/repositories/user/db-find-user-by-id';
import { LoadUserByRequest } from '../../../presentation/helpers/load-user-by-request';

export function makeLoadUserByRequest(): LoadUserByRequest {
  const jwtAdapter = new JwtAdapter();
  const dbFindUserById = new DbFindUserById();

  return new LoadUserByRequest(jwtAdapter, dbFindUserById);
}

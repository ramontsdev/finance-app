import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbFindUserById } from '../../../infra/database/repositories/user/db-find-user-by-id';
import { MeController } from '../../../presentation/controllers/user/me-controller';
import { LoadUserByRequest } from '../../../presentation/helpers/load-user-by-request';

export function makeMeController(): MeController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindUserById();
  const loadMemberFromRequest = new LoadUserByRequest(jwtAdapter, dbFindMemberById);

  return new MeController(loadMemberFromRequest);
}

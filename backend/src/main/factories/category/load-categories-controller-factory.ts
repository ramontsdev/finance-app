import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbLoadCategories } from '../../../infra/database/repositories/category/db-load-categories';
import { DbFindUserById } from '../../../infra/database/repositories/user/db-find-user-by-id';
import { LoadCategoriesController } from '../../../presentation/controllers/category/load-categories-controller';
import { LoadUserByRequest } from '../../../presentation/helpers/load-user-by-request';

export function makeLoadCategoriesController(): LoadCategoriesController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindUserById();
  const loadMemberFromRequest = new LoadUserByRequest(jwtAdapter, dbFindMemberById);

  const dbLoadCategories = new DbLoadCategories();

  return new LoadCategoriesController(loadMemberFromRequest, dbLoadCategories);
}

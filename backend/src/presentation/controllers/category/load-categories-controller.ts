import { ILoadCategories } from '../../../domain/use-cases/category/load-categories';
import { notFound, ok } from '../../helpers/http-helpers';
import { LoadUserByRequest } from '../../helpers/load-user-by-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class LoadCategoriesController implements IController {
  constructor(
    private readonly loadUserByRequest: LoadUserByRequest,
    private readonly loadCategories: ILoadCategories,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = await this.loadUserByRequest.loadUser(httpRequest);

    if (!user) return notFound();

    const categories = await this.loadCategories.loadAll(user.id);

    return ok(categories);
  }
}

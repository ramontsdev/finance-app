import { Request, Response } from 'express';

import { IController } from '../../presentation/protocols/controller';
import { HttpRequest } from '../../presentation/protocols/http';

export function adaptRoute(controller: IController) {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      headers: request.headers,
      body: request.body,
      query: request.query,
      params: request.params,
      files: request.files as any,
    };

    const httpResponse = await controller.handle(httpRequest);

    return response.status(httpResponse.statusCode).json(httpResponse.body);
  };
}

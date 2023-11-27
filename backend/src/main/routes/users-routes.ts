import { Router } from 'express';

import { adaptRoute } from '../adapters/express-router-adapter';
import { makeMeController } from '../factories/user/me-controller-factory';

export const usersRoutes = Router();

usersRoutes.get('/users/me', adaptRoute(makeMeController()));

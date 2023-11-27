import { Router } from 'express';

import { adaptRoute } from '../adapters/express-router-adapter';
import { makeSignInController } from '../factories/authentication/sign-in-controller-factory';
import { makeSignUpController } from '../factories/authentication/sign-up-controller-factory';

export const authenticationRoutes = Router();

authenticationRoutes.post('/auth/sign-in', adaptRoute(makeSignInController()));
authenticationRoutes.post('/auth/sign-up', adaptRoute(makeSignUpController()));

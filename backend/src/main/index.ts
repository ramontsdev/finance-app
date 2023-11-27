import 'dotenv/config';
import express from 'express';

import { cors } from './cors';
import { authenticationRoutes } from './routes/authentication-routes';
import { bankAccountsRoutes } from './routes/bank-accounts-routes';
import { categoriesRoutes } from './routes/categories-routes';
import { feedbacksRoutes } from './routes/feedbacks-routes';
import { transactionsRoutes } from './routes/transactions-routes';
import { usersRoutes } from './routes/users-routes';

const server = express();

server.use(cors);
server.use(express.json());
server.use(
  authenticationRoutes,
  usersRoutes,
  bankAccountsRoutes,
  categoriesRoutes,
  transactionsRoutes,
  feedbacksRoutes,
);

const port = process.env.PORT;
server.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

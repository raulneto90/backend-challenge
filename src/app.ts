import fastify from 'fastify';
import 'reflect-metadata';
import './container';

import { usersRoutes } from './modules/authentication/interface/routes/users.routes';

export const app = fastify({
  logger: true,
});

app.register(usersRoutes);

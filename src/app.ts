import fastify from 'fastify';
import 'reflect-metadata';
import './container';

import { usersRoutes } from './modules/authentication/interface/routes/users.routes';

export const app = fastify({
  logger: true,
});

app.register(usersRoutes);

app.setErrorHandler((error, _, response) => {
  const formattedError = {
    statusCode: error.statusCode || 500,
    message: error.message,
  };

  return response.status(formattedError.statusCode).send({
    message: formattedError.message,
  });
});

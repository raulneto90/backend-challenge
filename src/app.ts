import fastify from 'fastify';
import 'reflect-metadata';
import './container';

import { usersRouter } from './modules/authentication/interface/routes/users.routes';
import { tasksRouter } from './modules/tasks/interface/routes/tasks.routes';

export const app = fastify({});

app.register(usersRouter);

app.register(tasksRouter);

app.setErrorHandler((error, _, response) => {
  const formattedError = {
    statusCode: error.statusCode || 500,
    message: error.message,
  };

  return response.status(formattedError.statusCode).send({
    message: formattedError.message,
  });
});

import { FastifyInstance } from 'fastify';

import { CreateUserController } from '../controllers/create-user-controller';

const createUserController = new CreateUserController();

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.post('/users', createUserController.handle);
}

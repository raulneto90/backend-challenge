import { FastifyInstance } from 'fastify';

import { CreateUserController } from '../controllers/create-user-controller';
import { AuthenticateUserController } from '../controllers/create-user-token-controller';

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/register', createUserController.handle);
  fastify.post('/auth/login', authenticateUserController.handle);
}

import { FastifyInstance } from 'fastify';

import { CreateTaskController } from '../controllers/create-task-controller';
import { ensureAuthentication } from '../../../common/interface/middlewares/ensure-authentication';

const createTaskController = new CreateTaskController();

export async function tasksRouter(fastify: FastifyInstance) {
  fastify.register(ensureAuthentication);
  fastify.post('/tasks', createTaskController.handle);
}

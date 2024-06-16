import { FastifyInstance } from 'fastify';

import { CreateTaskController } from '../controllers/create-task-controller';
import { ensureAuthentication } from '../../../common/interface/middlewares/ensure-authentication';
import { FindTaskByIdController } from '../controllers/find-task-by-id-controller';

const createTaskController = new CreateTaskController();
const findTaskByIdController = new FindTaskByIdController();

export async function tasksRouter(fastify: FastifyInstance) {
  fastify.register(ensureAuthentication);
  fastify.post('/tasks', createTaskController.handle);
  fastify.get('/tasks/:id', findTaskByIdController.handle);
}

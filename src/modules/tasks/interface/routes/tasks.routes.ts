import { FastifyInstance } from 'fastify';

import { CreateTaskController } from '../controllers/create-task-controller';
import { ensureAuthentication } from '../../../common/interface/middlewares/ensure-authentication';
import { FindTaskByIdController } from '../controllers/find-task-by-id-controller';
import { DeleteTaskController } from '../controllers/delete-task-controller';

const createTaskController = new CreateTaskController();
const findTaskByIdController = new FindTaskByIdController();
const deleteTaskController = new DeleteTaskController();

export async function tasksRouter(fastify: FastifyInstance) {
  fastify.register(ensureAuthentication);
  fastify.post('/tasks', createTaskController.handle);
  fastify.get('/tasks/:id', findTaskByIdController.handle);
  fastify.delete('/tasks/:id', deleteTaskController.handle);
}

import { FastifyInstance } from 'fastify';

import { CreateTaskController } from '../controllers/create-task-controller';
import { ensureAuthentication } from '../../../common/interface/middlewares/ensure-authentication';
import { FindTaskByIdController } from '../controllers/find-task-by-id-controller';
import { DeleteTaskController } from '../controllers/delete-task-controller';
import { UpdateTaskController } from '../controllers/update-task-controller';
import { ListTasksController } from '../controllers/list-tasks-controller';

const createTaskController = new CreateTaskController();
const findTaskByIdController = new FindTaskByIdController();
const deleteTaskController = new DeleteTaskController();
const updateTaskController = new UpdateTaskController();
const listTasksController = new ListTasksController();

export async function tasksRouter(fastify: FastifyInstance) {
  fastify.register(ensureAuthentication);
  fastify.post('/tasks', createTaskController.handle);
  fastify.get('/tasks/:id', findTaskByIdController.handle);
  fastify.delete('/tasks/:id', deleteTaskController.handle);
  fastify.put('/tasks/:id', updateTaskController.handle);
  fastify.get('/tasks', listTasksController.handle);
}

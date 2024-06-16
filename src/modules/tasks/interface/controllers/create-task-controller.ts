import { FastifyReply, FastifyRequest } from 'fastify';
import { createTaskSchema } from '../dtos/create-task.dto';
import { container } from 'tsyringe';
import { CreateTaskUseCase } from '../../application/create-task-use-case';

export class CreateTaskController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const taskSchema = createTaskSchema.safeParse(request.body);

    if (taskSchema.success === false) {
      return response.status(400).send({
        message: 'Erro na validação dos dados',
        errors: taskSchema.error.format(),
      });
    }

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    const task = await createTaskUseCase.execute(taskSchema.data);

    return response.status(201).send(task);
  }
}

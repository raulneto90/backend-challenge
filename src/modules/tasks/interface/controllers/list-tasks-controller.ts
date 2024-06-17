import { FastifyReply, FastifyRequest } from 'fastify';
import { ListTasksUseCase } from '../../application/list-tasks-use-case';
import { container } from 'tsyringe';

export class ListTasksController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const listTasksUseCase = container.resolve(ListTasksUseCase);

    const tasks = await listTasksUseCase.execute();

    return response.send(tasks);
  }
}

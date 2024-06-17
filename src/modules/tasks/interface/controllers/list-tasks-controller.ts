import { FastifyReply, FastifyRequest } from 'fastify';
import { ListTasksUseCase } from '../../application/list-tasks-use-case';
import { container } from 'tsyringe';
import { listTasksQueryDTO } from '../dtos/list-tasks.dto';

export class ListTasksController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const listTasksSchema = listTasksQueryDTO.safeParse(request.query);

    if (listTasksSchema.success === false) {
      return response.status(400).send({
        message: 'Erro na validação dos dados',
        errors: listTasksSchema.error.format(),
      });
    }

    const listTasksUseCase = container.resolve(ListTasksUseCase);

    const { limit, page } = listTasksSchema.data;

    const tasks = await listTasksUseCase.execute(page, limit);

    return response.send(tasks);
  }
}

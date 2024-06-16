import { FastifyReply, FastifyRequest } from 'fastify';
import { findTaskByIdSchema } from '../dtos/find-task-by-id.dto';
import { container } from 'tsyringe';
import { FindTaskByIdUseCase } from '../../application/find-task-by-id-use-case';

export class FindTaskByIdController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const taskSchema = findTaskByIdSchema.safeParse(request.params);

    if (taskSchema.success === false) {
      return response.status(400).send({
        message: 'Erro na validação dos dados',
        errors: taskSchema.error.format(),
      });
    }

    const findTaskByIdUseCase = container.resolve(FindTaskByIdUseCase);

    const task = await findTaskByIdUseCase.execute(taskSchema.data.id);

    return response.send(task);
  }
}

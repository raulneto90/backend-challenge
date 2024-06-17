import { FastifyRequest, FastifyReply } from 'fastify';
import { container } from 'tsyringe';
import { DeleteTaskUseCase } from '../../application/delete-task-use-case';
import { deleteTaskSchema } from '../dtos/delete-task.dto';

export class DeleteTaskController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const deleteTaskDTO = deleteTaskSchema.safeParse(request.params);

    if (deleteTaskDTO.success === false) {
      return response.status(400).send({
        message: 'Erro na validação dos dados',
        errors: deleteTaskDTO.error.format(),
      });
    }

    const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);

    await deleteTaskUseCase.execute(deleteTaskDTO.data.id);

    return response.status(200).send({
      message: 'Tarefa deletada com sucesso',
    });
  }
}

import { FastifyReply, FastifyRequest } from 'fastify';
import {
  updateTaskBodyDTO,
  updateTaskParamsDTO,
} from '../dtos/update-task.dto';
import { container } from 'tsyringe';
import { UpdateTaskUseCase } from '../../application/update-task-use-case';

export class UpdateTaskController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const updateTaskSchemaParams = updateTaskParamsDTO.safeParse(
      request.params,
    );

    if (updateTaskSchemaParams.success === false) {
      return response.status(400).send({
        message: 'Erro na validação dos dados',
        errors: updateTaskSchemaParams.error.format(),
      });
    }

    const updateTaskSchemaBody = updateTaskBodyDTO.safeParse(request.body);

    if (updateTaskSchemaBody.success === false) {
      return response.status(400).send({
        message: 'Erro na validação dos dados',
        errors: updateTaskSchemaBody.error.format(),
      });
    }

    const updateTaskUseCase = container.resolve(UpdateTaskUseCase);

    const task = await updateTaskUseCase.execute({
      id: updateTaskSchemaParams.data.id,
      title: updateTaskSchemaBody.data.title,
      description: updateTaskSchemaBody.data.description,
      status: updateTaskSchemaBody.data.status,
    });

    return response.status(200).send(task);
  }
}

import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { createUserDTO } from '../dtos/create-user.dto';
import { CreateUserUseCase } from '../../application/create-user-use-case';

export class CreateUserController {
  async handle(
    request: FastifyRequest,
    response: FastifyReply,
  ): Promise<FastifyReply> {
    const userSchema = createUserDTO.safeParse(request.body);

    if (userSchema.success === false) {
      return response.status(400).send({
        message: 'Erro na validação dos dados',
        errors: userSchema.error.format(),
      });
    }

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(userSchema.data);

    return response.status(201).send({
      message: 'Usuário registrado com sucesso',
    });
  }
}

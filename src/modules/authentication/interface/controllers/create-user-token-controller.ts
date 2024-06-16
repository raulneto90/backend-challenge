import { FastifyReply, FastifyRequest } from 'fastify';
import { createUserTokenSchema } from '../dtos/create-user-token.dto';
import { AuthenticateUserUseCase } from '../../application/authenticate-user-use-case';
import { container } from 'tsyringe';

export class AuthenticateUserController {
  async handle(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const userSchema = createUserTokenSchema.safeParse(request.body);

    if (userSchema.success === false) {
      return reply.status(400).send({
        message: 'Erro na validação dos dados',
        errors: userSchema.error.format(),
      });
    }

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const token = await authenticateUserUseCase.execute(userSchema.data);

    return reply.status(200).send({
      token,
    });
  }
}

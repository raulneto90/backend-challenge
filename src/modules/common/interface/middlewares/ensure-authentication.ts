import { FastifyReply, FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';
import { env } from '../../../../config/env/env';

export const ensureAuthentication = async (
  request: FastifyRequest,
  response: FastifyReply,
) => {
  const authHeader = request.headers.authorization;

  console.log({ authHeader });

  if (!authHeader) {
    return response.status(401).send({
      message: 'Token não informado',
    });
  }

  const tokenMatch = authHeader.match(/^Bearer\s+(.+)$/);

  if (!tokenMatch) {
    response.code(401).send({ message: 'Token inválido' });
    return;
  }

  const token = tokenMatch[1];

  try {
    verify(token, env.JWT_SECRET);
  } catch (error) {
    response.code(401).send({ message: 'Token inválido' });
  }
};

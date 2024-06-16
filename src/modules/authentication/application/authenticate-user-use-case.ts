import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

import { UsersRepository } from '../domain/repositories/users-repository';
import { env } from '../../../config/env/env';
import { AppError } from '../../common/application/errors/ErrorHandler';

interface RequestParams {
  username: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(data: RequestParams): Promise<string> {
    const user = await this.usersRepository.findByUsername(data.username);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const passwordMatch = compareSync(data.password, user.password);

    if (!passwordMatch) {
      throw new AppError('Invalid credentials');
    }

    const token = sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}

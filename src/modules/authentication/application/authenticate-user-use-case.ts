import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

import { UsersRepository } from '../domain/repositories/users-repository';
import { env } from '../../../config/env/env';

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
      throw new Error('User not found');
    }

    const passwordMatch = compareSync(data.password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}

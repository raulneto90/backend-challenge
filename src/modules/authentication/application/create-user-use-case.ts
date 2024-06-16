import { inject, injectable } from 'tsyringe';
import { hashSync } from 'bcryptjs';

import { UsersRepository } from '../domain/repositories/users-repository';
import { User } from '../domain/entities/User';
import { AppError } from '../../common/application/errors/ErrorHandler';

interface RequestParams {
  username: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute(data: RequestParams): Promise<void> {
    const userExists = await this.usersRepository.findByUsername(data.username);

    if (userExists) {
      throw new AppError('User already exists');
    }

    const userPassword = hashSync(data.password, 10);
    data.password = userPassword;

    const newUser = new User(data);

    await this.usersRepository.create(newUser);
  }
}

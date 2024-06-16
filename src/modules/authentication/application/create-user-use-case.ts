import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../domain/repositories/users-repository';
import { User } from '../domain/entities/User';

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
      throw new Error('User already exists');
    }

    const newUser = new User(data);

    await this.usersRepository.create(newUser);
  }
}

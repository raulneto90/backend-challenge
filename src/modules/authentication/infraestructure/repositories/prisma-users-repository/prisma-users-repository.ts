import { prismaConnection } from '../../../../../config/database/prisma-connection';
import { User } from '../../../domain/entities/User';
import { UsersRepository } from '../../../domain/repositories/users-repository';
import { UserMapper } from '../../mappers/user-mapper';

export class PrismaUsersRepository implements UsersRepository {
  async create(user: User): Promise<void> {
    await prismaConnection.user.create({
      data: user,
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prismaConnection.user.findFirst({
      where: { username },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }
}

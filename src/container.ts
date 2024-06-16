import { container } from 'tsyringe';
import { PrismaUsersRepository } from './modules/authentication/infraestructure/repositories/prisma-users-repository/prisma-users-repository';

container.registerSingleton('UsersRepository', PrismaUsersRepository);

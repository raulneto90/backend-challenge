import { container } from 'tsyringe';
import { PrismaUsersRepository } from './modules/authentication/infraestructure/repositories/prisma-users-repository/prisma-users-repository';
import { PrismaTasksRepository } from './modules/tasks/infraestructure/repositories/prisma-tasks-repository';

container.registerSingleton('UsersRepository', PrismaUsersRepository);
container.registerSingleton('TasksRepository', PrismaTasksRepository);

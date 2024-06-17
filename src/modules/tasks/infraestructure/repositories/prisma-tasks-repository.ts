import { prismaConnection } from '../../../../config/database/prisma-connection';
import { Task } from '../../domain/entities/Task';
import { TasksRepository } from '../../domain/repositories/tasks-repository';
import { TaskMapper } from '../mappers/task-mapper';

export class PrismaTasksRepository implements TasksRepository {
  async create(data: Task): Promise<Task> {
    const task = await prismaConnection.task.create({
      data,
    });

    return TaskMapper.toDomain(task);
  }

  async findAll(): Promise<Task[] | null> {
    const tasks = await prismaConnection.task.findMany();

    if (!tasks.length) {
      return [];
    }

    return tasks.map(task => TaskMapper.toDomain(task));
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prismaConnection.task.findUnique({
      where: {
        id,
      },
    });

    if (!task) {
      return null;
    }

    return TaskMapper.toDomain(task);
  }

  async delete(id: string): Promise<void> {
    await prismaConnection.task.delete({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    data: Pick<Task, 'title' | 'description' | 'status'>,
  ): Promise<Task> {
    const updatedTask = await prismaConnection.task.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return TaskMapper.toDomain(updatedTask);
  }
}

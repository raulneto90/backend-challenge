import { prismaConnection } from '../../../../config/database/prisma-connection';
import { Task } from '../../domain/entities/Task';
import {
  PaginationResults,
  TasksRepository,
} from '../../domain/repositories/tasks-repository';
import { TaskMapper } from '../mappers/task-mapper';

export class PrismaTasksRepository implements TasksRepository {
  async create(data: Task): Promise<Task> {
    const task = await prismaConnection.task.create({
      data,
    });

    return TaskMapper.toDomain(task);
  }

  async findAll(page: number, limit: number): Promise<PaginationResults<Task>> {
    const offset = (page - 1) * limit;

    const [tasks, totalTasks] = await Promise.all([
      prismaConnection.task.findMany({
        skip: offset,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prismaConnection.task.count(),
    ]);

    if (!tasks.length) {
      return {
        total: 0,
        results: [],
      };
    }

    return {
      total: totalTasks,
      results: tasks.map(TaskMapper.toDomain),
    };
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

import { Task } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { TasksRepository } from '../domain/repositories/tasks-repository';

interface ResponseParams {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalTasks: number;
  };
}

@injectable()
export class ListTasksUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: TasksRepository,
  ) {}

  async execute(page: number, limit: number): Promise<ResponseParams> {
    const { results, total } = await this.tasksRepository.findAll(page, limit);

    return {
      tasks: results,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalTasks: total,
      },
    };
  }
}

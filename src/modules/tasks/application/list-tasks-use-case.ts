import { Task } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { TasksRepository } from '../domain/repositories/tasks-repository';

@injectable()
export class ListTasksUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: TasksRepository,
  ) {}

  async execute(): Promise<Task[]> {
    const tasks = await this.tasksRepository.findAll();

    if (!tasks?.length) {
      return [];
    }

    return tasks;
  }
}

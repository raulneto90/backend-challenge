import { inject, injectable } from 'tsyringe';
import { AppError } from '../../common/application/errors/ErrorHandler';
import { TasksRepository } from '../domain/repositories/tasks-repository';
import { Task } from '../domain/entities/Task';

interface RequestParams {
  title: string;
  description: string;
  status: string;
  id: string;
}

@injectable()
export class UpdateTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
  ) {}

  async execute(data: RequestParams): Promise<Task> {
    const task = await this.tasksRepository.findById(data.id);
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    const updatedData = {
      title: data.title,
      description: data.description,
      status: data.status,
    };

    const updatedTask = await this.tasksRepository.update(data.id, updatedData);

    return updatedTask;
  }
}

import { inject, injectable } from 'tsyringe';
import { TasksRepository } from '../domain/repositories/tasks-repository';
import { AppError } from '../../common/application/errors/ErrorHandler';

@injectable()
export class DeleteTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    await this.tasksRepository.delete(id);
  }
}

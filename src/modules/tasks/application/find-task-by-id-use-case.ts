import { inject, injectable } from 'tsyringe';
import { TasksRepository } from '../domain/repositories/tasks-repository';
import { Task } from '../domain/entities/Task';

@injectable()
export class FindTaskByIdUseCase {
  constructor(
    @inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
  ) {}

  async execute(id: string): Promise<Task | undefined> {
    return this.tasksRepository.findById(id);
  }
}

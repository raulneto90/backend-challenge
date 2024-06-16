import { inject, injectable } from 'tsyringe';
import { TasksRepository } from '../domain/repositories/tasks-repository';
import { Task } from '../domain/entities/Task';

interface RequestParams {
  title: string;
  description: string;
  status: string;
}

@injectable()
export class CreateTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private readonly tasksRepository: TasksRepository,
  ) {}

  async execute(data: RequestParams): Promise<Task> {
    const task = new Task(data);

    const createdTask = await this.tasksRepository.create(task);

    return createdTask;
  }
}

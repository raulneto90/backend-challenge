import { Task } from '../entities/Task';

export interface TasksRepository {
  create(data: Task): Promise<Task>;
  findAll(): Promise<Task[] | null>;
  findById(id: string): Promise<Task | null>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    data: Pick<Task, 'title' | 'description' | 'status'>,
  ): Promise<void>;
}

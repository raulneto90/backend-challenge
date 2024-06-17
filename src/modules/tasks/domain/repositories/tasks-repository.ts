import { Task } from '../entities/Task';

export interface PaginationResults<T> {
  results: T[];
  total: number;
}

export interface TasksRepository {
  create(data: Task): Promise<Task>;
  findAll(page: number, limit: number): Promise<PaginationResults<Task>>;
  findById(id: string): Promise<Task | null>;
  delete(id: string): Promise<void>;
  update(
    id: string,
    data: Pick<Task, 'title' | 'description' | 'status'>,
  ): Promise<Task>;
}

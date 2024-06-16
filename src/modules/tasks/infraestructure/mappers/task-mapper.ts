import { Task } from '../../domain/entities/Task';

export class TaskMapper {
  static toDomain(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}

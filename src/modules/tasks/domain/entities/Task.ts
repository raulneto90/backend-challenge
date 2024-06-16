import { randomUUID } from 'crypto';

interface TaskConstructor {
  id?: string;
  title: string;
  description: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor({
    id,
    title,
    description,
    status,
    createdAt,
    updatedAt,
  }: TaskConstructor) {
    this.id = id || randomUUID();
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

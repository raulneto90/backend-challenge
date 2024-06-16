import { randomUUID } from 'crypto';

interface UserConstructor {
  id?: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor({
    id,
    username,
    password,
    createdAt,
    updatedAt,
  }: UserConstructor) {
    this.id = id || randomUUID();
    this.username = username;
    this.password = password;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

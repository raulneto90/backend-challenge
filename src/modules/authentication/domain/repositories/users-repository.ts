import { User } from '../entities/User';

export interface UsersRepository {
  create(user: User): Promise<void>;
  findByUsername(username: string): Promise<User | null>;
}

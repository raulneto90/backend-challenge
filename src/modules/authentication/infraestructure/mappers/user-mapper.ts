import { User } from '../../domain/entities/User';

export class UserMapper {
  static toDomain(raw: any): User {
    return new User({
      id: raw.id,
      username: raw.username,
      password: raw.password,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}

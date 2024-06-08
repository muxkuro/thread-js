import { type User } from './types.js';

type UserService = {
  getById(_id: number): Promise<User | null>;
};

export { type UserService };

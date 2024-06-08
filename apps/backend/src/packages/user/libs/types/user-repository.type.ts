import { type Repository } from '~/libs/modules/database/database.js';

import { type User } from './types.js';

type UserRepository = Pick<Repository<User>, 'create'> & {
  getByEmail(_email: string): Promise<User | null>;

  getByUsername(_username: string): Promise<User | null>;
};

export { type UserRepository };

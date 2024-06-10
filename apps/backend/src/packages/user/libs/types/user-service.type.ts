import { type UserSignUpRequestDto } from '~/packages/auth/libs/types/types.js';

import { type User } from './types.js';

type UserService = {
  create(payload: UserSignUpRequestDto): Promise<User>;
};

export { type UserService };

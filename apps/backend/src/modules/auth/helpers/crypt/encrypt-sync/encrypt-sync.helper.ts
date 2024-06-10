import { hashSync } from 'bcrypt';

import { PASSWORD_SALT_ROUNDS } from '../libs/constants/constants.js';

const encryptSync = (data: string): string => {
  return hashSync(data, PASSWORD_SALT_ROUNDS);
};

export { encryptSync };

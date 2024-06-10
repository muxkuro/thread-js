import { DatabaseTableName } from '~/libs/modules/database/database.js';
import { encryptSync } from '~/packages/auth/auth.js';

import { type GetCrudHandlersFunction } from '../../../../../libs/modules/database/libs/types/types.js';
import { TEST_USERS_CREDENTIALS } from '../../constants/constants.js';

const hash = (password: string): string => encryptSync(password);

const setupTestUsers = async ({
  handlers: { insert }
}: Record<
  'handlers',
  Pick<ReturnType<GetCrudHandlersFunction>, 'insert'>
>): Promise<void> => {
  const usersToInsert = TEST_USERS_CREDENTIALS.map(
    ({ password, ...credentials }) => ({
      ...credentials,
      password: hash(password)
    })
  );

  await insert({
    data: usersToInsert,
    table: DatabaseTableName.USERS
  });
};

export { setupTestUsers };

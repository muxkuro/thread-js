import { type Knex } from 'knex';

import { usersSeed } from '../seed-data/users-seed.js';

const TableName = {
  USERS: 'users'
} as const;

const seed = async (knex: Knex): Promise<void> => {
  await knex.transaction(async trx => {
    await trx(TableName.USERS).del();

    await trx(TableName.USERS).insert(usersSeed).returning('*');
  });
};

export { seed };

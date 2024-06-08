import { type Knex } from 'knex';

import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type DatabaseModule = {
  knex: Knex;
  environmentsConfig: Record<ValueOf<typeof AppEnvironment>, Knex.Config>;
  initialConfig: Knex.Config;
  connect(): Promise<void>;
};

export { type DatabaseModule };

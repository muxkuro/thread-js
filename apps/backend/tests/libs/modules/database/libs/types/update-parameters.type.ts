import { type DatabaseTableName } from '~/libs/modules/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

type UpdateParameters<T extends Record<string, unknown>> = {
  table: ValueOf<typeof DatabaseTableName>;
  condition?: T;
  data?: T;
  returning?: string[];
};

export { type UpdateParameters };

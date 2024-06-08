import { type DatabaseTableName } from '~/libs/modules/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

type RemoveParameters<T extends Record<string, unknown>> = {
  table: ValueOf<typeof DatabaseTableName>;
  condition?: T;
};

export { type RemoveParameters };

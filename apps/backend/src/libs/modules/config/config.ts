import { logger } from '../logger/logger.js';
import { Config } from './config.module.js';

const config = new Config({ logger });

export { config };
export {
  type ConfigModule,
  type EnvironmentSchema
} from './libs/types/types.js';

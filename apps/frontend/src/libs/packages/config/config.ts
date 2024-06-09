import { Config } from './config.package.js';

const config = new Config();

export { config };
export {
  type ConfigModule,
  type EnvironmentSchema
} from './libs/types/types.js';

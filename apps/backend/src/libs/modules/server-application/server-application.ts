import { parse, type ParsedQs } from 'qs';

import { config } from '~/libs/modules/config/config.js';
import { database } from '~/libs/modules/database/database.js';
import { authController } from '~/packages/auth/auth.js';

import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';
import { logger } from '../logger/logger.js';

const serverAppApiV1 = new ServerAppApi({
  routes: [...authController.routes],
  version: 'v1'
});

const serverApp = new ServerApp({
  config,
  logger,
  options: {
    ignoreTrailingSlash: true,
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    },
    querystringParser: (stringToParse: string): ParsedQs => {
      return parse(stringToParse, { comma: true });
    }
  },
  database,
  apis: [serverAppApiV1]
});

export { serverApp, serverAppApiV1 };
export { ExitCode } from './libs/enums/enums.js';
export { ServerApp } from './server-app.js';
export { type ServerApplicationRouteParameters } from './libs/types/types.js';

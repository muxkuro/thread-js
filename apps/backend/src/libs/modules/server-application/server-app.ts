import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import fastifyStatic from '@fastify/static';
import fastify, {
  FastifyError,
  type FastifyInstance,
  type FastifyServerOptions
} from 'fastify';

import { type ConfigModule } from '~/libs/modules/config/config.js';
import { joinPath } from '~/libs/modules/path/path.js';

import { type ValidationSchema } from '~/libs/types/types.js';

import { type DatabaseModule } from '../database/database.js';
import { type ServerApi } from './libs/types/types.js';
import { LoggerModule } from '../logger/logger.js';
import { ValidationError } from '~/libs/exceptions/exceptions.js';
import { getErrorInfo } from './libs/helpers/helpers.js';
import { ServerErrorType } from '~/libs/enums/enums.js';

type Constructor = {
  config: ConfigModule;
  logger: LoggerModule;
  apis: ServerApi[];
  options: FastifyServerOptions;
  database: DatabaseModule;
};

class ServerApp {
  #app: FastifyInstance;

  #config: ConfigModule;

  #logger: LoggerModule;

  #apis: ServerApi[];

  #database: DatabaseModule;

  public constructor({ config, logger, options, apis, database }: Constructor) {
    this.#config = config;
    this.#logger = logger;

    this.#app = this.#initApp(options);

    this.#apis = apis;
    this.#database = database;
  }

  public get app(): FastifyInstance {
    return this.#app;
  }

  public get database(): DatabaseModule {
    return this.#database;
  }

  #initApp = (options: FastifyServerOptions): FastifyInstance => {
    const app = fastify(options);

    return app;
  };

  public initialize = async (): Promise<typeof this> => {
    this.#initValidationCompiler();
    await this.#registerServe();
    this.#registerRoutes();
    this.#initErrorHandler();

    await this.#database.connect();

    return this;
  };

  #registerServe = async (): Promise<void> => {
    const staticPath = join(
      dirname(fileURLToPath(import.meta.url)),
      '../../../../public'
    );

    await this.#app.register(fastifyStatic, {
      root: staticPath,
      prefix: '/'
    });

    this.#app.setNotFoundHandler(async (_request, response) => {
      await response.sendFile('index.html', staticPath);
    });
  };

  #registerRoutes = (): void => {
    const routers = this.#apis.flatMap(it => it.routes);

    for (const it of routers) {
      const { url: path, ...parameters } = it;

      this.app.route({
        url: joinPath([this.#config.ENV.APP.API_PATH, path]),
        ...parameters
      });
    }
  };

  #initValidationCompiler = (): void => {
    this.app.setValidatorCompiler<ValidationSchema>(({ schema }) => {
      return <T, R = ReturnType<ValidationSchema['validate']>>(data: T): R => {
        return schema.validate(data, {
          abortEarly: false
        }) as R;
      };
    });
  };

  #initErrorHandler(): void {
    this.app.setErrorHandler(
      (error: FastifyError | ValidationError, _request, reply) => {
        const { internalMessage, status, response } = getErrorInfo(error);

        this.#logger.error(internalMessage);

        if (response.errorType === ServerErrorType.VALIDATION) {
          response.details.forEach(detail => {
            this.#logger.error(
              `[${detail.path.toString()}] — ${detail.message}`
            );
          });
        }

        return reply.status(status).send(response);
      }
    );
  }

  public start = async (): Promise<void> | never => {
    try {
      await this.#app.listen({
        port: this.#config.ENV.APP.PORT,
        host: this.#config.ENV.APP.HOST
      });
      console.log(this.#app.printRoutes());
      this.#logger.info(
        `Application is listening on PORT - ${this.#config.ENV.APP.PORT.toString()}, on ENVIRONMENT - ${
          this.#config.ENV.APP.ENVIRONMENT as string
        }.`
      );
    } catch (error) {
      if (error instanceof Error) {
        this.#logger.error(error.message, {
          cause: error.cause,
          stack: error.stack
        });
      }

      throw error;
    }
  };
}

export { ServerApp };

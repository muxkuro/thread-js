import LibraryKnex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type ConfigModule } from '../config/config.js';
import { type DatabaseModule } from './libs/types/types.js';
import { LoggerModule } from '../logger/logger.js';

type Constructor = {
  config: ConfigModule;
  logger: LoggerModule;
};

class Database implements DatabaseModule {
  #config: ConfigModule;

  #logger: LoggerModule;

  #knex!: LibraryKnex.Knex;

  public constructor({ config, logger }: Constructor) {
    this.#config = config;
    this.#logger = logger;
  }

  public async connect(): Promise<void> {
    this.#logger.info('Establish DB connection...');

    this.#knex = LibraryKnex.default(this.environmentConfig);

    await this.#knex.raw('SELECT VERSION()');
    this.#logger.info('DB connection established successfully!');

    Model.knex(this.#knex);
  }

  public get environmentsConfig(): Record<
    ValueOf<typeof AppEnvironment>,
    LibraryKnex.Knex.Config
  > {
    const { TEST_DATABASE: testDatabase } = this.#config.ENV.DB;

    return {
      [AppEnvironment.DEVELOPMENT]: this.initialConfig,
      [AppEnvironment.PRODUCTION]: this.initialConfig,
      [AppEnvironment.TEST]: {
        ...this.initialConfig,
        connection: {
          ...(this.initialConfig
            .connection as LibraryKnex.Knex.StaticConnectionConfig),
          database: testDatabase
        }
      }
    };
  }

  public get knex(): LibraryKnex.Knex {
    return this.#knex;
  }

  public get initialConfig(): LibraryKnex.Knex.Config {
    const {
      DATABASE: database,
      USERNAME: username,
      PASSWORD: password,
      HOST: host,
      PORT: port,
      CLIENT: client,
      DEBUG: debug
    } = this.#config.ENV.DB;

    return {
      client,
      connection: {
        user: username,
        port,
        host,
        database,
        password
      },
      migrations: {
        directory: './src/db/migrations',
        tableName: 'knex_migrations'
      },
      seeds: {
        directory: './src/db/seeds'
      },
      debug,
      ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true })
    };
  }

  public get environmentConfig(): LibraryKnex.Knex.Config {
    return this.environmentsConfig[this.#config.ENV.APP.ENVIRONMENT];
  }
}

export { Database };

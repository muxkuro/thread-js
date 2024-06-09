import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type ConfigModule } from '~/libs/packages/config/config.js';
import { authApi, authReducer } from '~/modules/auth/auth.js';

import { storageApi } from '~/modules/storage/storage.js';

import {
  type ExtraArguments,
  type StoreInstance,
  type StorePackage
} from './libs/types/types.js';

class Store implements StorePackage {
  #instance: StoreInstance;

  public get instance(): StoreInstance {
    return this.#instance;
  }

  public constructor(config: ConfigModule) {
    this.#instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        auth: authReducer
      },
      middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
          thunk: {
            extraArgument: this.extraArguments
          }
        });
      }
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      storageApi
    };
  }
}

export { Store };

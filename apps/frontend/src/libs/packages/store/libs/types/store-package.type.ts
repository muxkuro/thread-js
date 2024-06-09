import {
  type configureStore,
  type ThunkMiddleware,
  type Tuple,
  type UnknownAction
} from '@reduxjs/toolkit';

import { authReducer, type authApi } from '~/modules/auth/auth.js';

import { type storageApi } from '~/modules/storage/storage.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  storageApi: typeof storageApi;
};

type StoreInstance = ReturnType<
  typeof configureStore<
    RootReducer,
    UnknownAction,
    Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
  >
>;

type StorePackage = {
  extraArguments: ExtraArguments;
};

export { type ExtraArguments, type StoreInstance, type StorePackage };

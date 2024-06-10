import { storageApi } from '~/modules/storage/storage.js';

import { Http as HttpApi } from './http-api.js';

const httpApi = new HttpApi({
  storageApi
});

export { httpApi };
export { HTTPError } from './libs/exceptions/exceptions.js';
export { type HttpApi, type HttpOptions } from './libs/types/types.js';

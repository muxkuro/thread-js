import { ServerErrorResponse } from '@thread-js/shared';
import { HTTPCode } from '~/libs/modules/http/http.js';
import { ValueOf } from '~/libs/types/types.js';

type ErrorInfo = {
  internalMessage: string;
  status: ValueOf<typeof HTTPCode>;
  response: ServerErrorResponse;
};

export { type ErrorInfo };

import { HTTPCode } from '~/libs/modules/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

type ControllerAPIHandlerResponse<T = unknown> = {
  status: ValueOf<typeof HTTPCode>;
  payload: T;
};

export { type ControllerAPIHandlerResponse };

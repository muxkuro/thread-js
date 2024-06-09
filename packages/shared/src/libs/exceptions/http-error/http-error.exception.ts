import { type ValueOf } from '~/libs/types/types.js';

import { ExceptionName } from '../../enums/enums.js';
import { HTTPCode } from '../../modules/http/http.js';

const DEFAULT_MESSAGE = 'Network Error';

type Constructor = {
  cause?: unknown;
  status: ValueOf<typeof HTTPCode>;
  message: string;
};

class HTTPError extends Error {
  public status: ValueOf<typeof HTTPCode>;

  public constructor({
    cause,
    status = HTTPCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE
  }: Partial<Constructor> = {}) {
    super(message, { cause });
    this.status = status;
    this.name = ExceptionName.HTTP_ERROR;
  }
}

export { HTTPError };

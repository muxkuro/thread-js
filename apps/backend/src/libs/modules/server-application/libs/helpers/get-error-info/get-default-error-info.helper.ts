import { HTTPCode } from '~/libs/modules/http/http.js';
import { APIError, ErrorInfo } from '../../types/types.js';
import { ServerErrorType } from '~/libs/enums/enums.js';

const getDefaultErrorInfo = (error: APIError): ErrorInfo => {
  return {
    internalMessage: error.message,
    status: HTTPCode.INTERNAL_SERVER_ERROR,
    response: {
      message: error.message,
      errorType: ServerErrorType.COMMON
    }
  };
};

export { getDefaultErrorInfo };

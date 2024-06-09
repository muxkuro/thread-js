import { type APIPath } from '~/libs/enums/enums.js';
import {
  Controller,
  ControllerAPIHandler,
  ControllerAPIHandlerOptions,
  ControllerAPIHandlerResponse
} from '~/libs/modules/controller/controller.js';
import { HTTPCode, HTTPMethod } from '~/libs/modules/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

import { AuthApiPath } from './libs/enums/enums.js';
import {
  UserSignUpResponseDto,
  type AuthController,
  type AuthService,
  type UserSignUpRequestDto
} from './libs/types/types.js';
import { signUpValidationSchema } from './libs/validation-schemas/validation-schemas.js';
import { LoggerModule } from '~/libs/modules/logger/logger.js';

type Constructor = {
  apiPath: ValueOf<typeof APIPath>;
  authService: AuthService;
  logger: LoggerModule;
};

class Auth extends Controller implements AuthController {
  #authService: AuthService;

  public constructor({ apiPath, authService, logger }: Constructor) {
    super({ apiPath, logger });
    this.#authService = authService;

    this.addRoute({
      method: HTTPMethod.POST,
      url: AuthApiPath.SIGN_UP,
      schema: {
        body: signUpValidationSchema
      },
      handler: this.register as ControllerAPIHandler
    });
  }

  public register = async (
    options: ControllerAPIHandlerOptions<{
      body: UserSignUpRequestDto;
    }>
  ): Promise<ControllerAPIHandlerResponse<UserSignUpResponseDto>> => {
    return {
      payload: await this.#authService.register(options.body),
      status: HTTPCode.CREATED
    };
  };
}

export { Auth };

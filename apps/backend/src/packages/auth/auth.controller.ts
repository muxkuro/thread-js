import { type APIPath } from '~/libs/enums/enums.js';
import {
  Controller,
  ControllerAPIHandler,
  ControllerAPIHandlerOptions,
  ControllerAPIHandlerResponse,
  ControllerHook
} from '~/libs/modules/controller/controller.js';
import { HTTPCode, HTTPMethod } from '~/libs/modules/http/http.js';
import { type ValueOf } from '~/libs/types/types.js';

import { AuthApiPath } from './libs/enums/enums.js';
import {
  UserRegisterResponseDto,
  type AuthController,
  type AuthService,
  type UserRegisterRequestDto
} from './libs/types/types.js';
import { registrationValidationSchema } from './libs/validation-schemas/validation-schemas.js';
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
      url: AuthApiPath.REGISTER,
      schema: {
        body: registrationValidationSchema
      },
      handler: this.register as ControllerAPIHandler
    });
  }

  public register = async (
    options: ControllerAPIHandlerOptions<{
      body: UserRegisterRequestDto;
    }>
  ): Promise<ControllerAPIHandlerResponse<UserRegisterResponseDto>> => {
    return {
      payload: await this.#authService.register(options.body),
      status: HTTPCode.CREATED
    };
  };
}

export { Auth };

import { APIPath } from '~/libs/enums/enums.js';
import { userRepository } from '~/packages/user/user.js';

import { Auth as AuthController } from './auth.controller.js';
import { Auth as AuthService } from './auth.service.js';
import { logger } from '~/libs/modules/logger/logger.js';

const authService = new AuthService({
  userRepository
});
const authController = new AuthController({
  apiPath: APIPath.AUTH,
  authService,
  logger
});

export { authController, authService };
export { encryptSync } from './helpers/helpers.js';
export { AuthApiPath } from './libs/enums/enums.js';
export {
  type AuthService,
  type UserRegisterRequestDto,
  type UserRegisterResponseDto
} from './libs/types/types.js';

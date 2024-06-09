import { type FastifyReply, type FastifyRequest } from 'fastify';

import {
  type UserSignUpResponseDto,
  type UserSignUpRequestDto
} from './types.js';
import {
  ControllerAPIHandlerOptions,
  ControllerAPIHandlerResponse
} from '~/libs/modules/controller/controller.js';

type AuthController = {
  register: (
    options: ControllerAPIHandlerOptions<{
      body: UserSignUpRequestDto;
    }>
  ) => Promise<ControllerAPIHandlerResponse<UserSignUpResponseDto>>;
};

export { type AuthController };

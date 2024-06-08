import { type FastifyReply, type FastifyRequest } from 'fastify';

import {
  type UserRegisterResponseDto,
  type UserRegisterRequestDto
} from './types.js';
import {
  ControllerAPIHandlerOptions,
  ControllerAPIHandlerResponse
} from '~/libs/modules/controller/controller.js';

type AuthController = {
  register: (
    options: ControllerAPIHandlerOptions<{
      body: UserRegisterRequestDto;
    }>
  ) => Promise<ControllerAPIHandlerResponse<UserRegisterResponseDto>>;
};

export { type AuthController };

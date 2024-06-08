import {
  type UserRegisterRequestDto,
  type UserRegisterResponseDto
} from './types.js';

type AuthService = {
  register(_user: UserRegisterRequestDto): Promise<UserRegisterResponseDto>;
};

export { type AuthService };

import { type UserRepository } from '../user/user.js';
import {
  type UserRegisterResponseDto,
  type AuthService,
  type UserRegisterRequestDto
} from './libs/types/types.js';

type Constructor = {
  userRepository: UserRepository;
};

class Auth implements AuthService {
  #userRepository: UserRepository;

  public constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  public register = async (
    userRequestDto: UserRegisterRequestDto
  ): Promise<UserRegisterResponseDto> => {
    return this.#userRepository.create(userRequestDto);
  };
}

export { Auth };

import { type UserRepository } from '../user/user.js';
import {
  type UserSignUpResponseDto,
  type AuthService,
  type UserSignUpRequestDto
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
    userRequestDto: UserSignUpRequestDto
  ): Promise<UserSignUpResponseDto> => {
    return this.#userRepository.create(userRequestDto);
  };
}

export { Auth };

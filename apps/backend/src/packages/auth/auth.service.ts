import { type UserRepository } from '../user/user.js';
import {
  type AuthService,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './libs/types/types.js';

type Constructor = {
  userRepository: UserRepository;
};

class Auth implements AuthService {
  #userRepository: UserRepository;

  public register = async (
    userRequestDto: UserSignUpRequestDto
  ): Promise<UserSignUpResponseDto> => {
    return await this.#userRepository.create(userRequestDto);
  };

  public constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }
}

export { Auth };

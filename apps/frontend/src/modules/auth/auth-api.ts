import { APIPath, ContentType } from '~/libs/enums/enums.js';
import { HTTPMethod } from '~/modules/http/libs/enums/enums.js';

import { type HttpApi } from '../http/http.js';
import { AuthApiPath } from './libs/enums/enums.js';
import {
  type AuthApi,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from './libs/types/types.js';

type Constructor = {
  apiPath: string;
  httpApi: HttpApi;
};

class Auth implements AuthApi {
  #apiPath: string;

  #httpApi: HttpApi;

  public constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public signUp(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${APIPath.AUTH}${AuthApiPath.SIGN_UP}`,
      {
        method: HTTPMethod.POST,
        contentType: ContentType.JSON,
        hasAuth: false,
        payload: JSON.stringify(payload)
      }
    );
  }
}

export { Auth };

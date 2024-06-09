import { UserPayloadKey } from '~/modules/user/enums/enums.js';

const DEFAULT_REGISTRATION_PAYLOAD = {
  [UserPayloadKey.USERNAME]: '',
  [UserPayloadKey.EMAIL]: '',
  [UserPayloadKey.PASSWORD]: ''
};

export { DEFAULT_REGISTRATION_PAYLOAD };

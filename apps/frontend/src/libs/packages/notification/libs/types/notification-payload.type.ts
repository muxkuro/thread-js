import { type ValueOf } from '~/libs/types/types.js';

import { type NotificationType } from '../enums/enums.js';

type NotificationPayload = {
  message: string;
  type: ValueOf<typeof NotificationType>;
};

export { type NotificationPayload };

import { HTTPMethod } from '~/libs/modules/http/http.js';
import { type ValidationSchema, type ValueOf } from '~/libs/types/types.js';
import { ControllerAPIHandler } from './controller-api-handler.type.js';

type ControllerRouteParameters = {
  url: string;
  method: ValueOf<typeof HTTPMethod>;
  handler: ControllerAPIHandler;
  schema?: {
    body?: ValidationSchema;
    params?: ValidationSchema;
    query?: ValidationSchema;
  };
};

export { type ControllerRouteParameters };

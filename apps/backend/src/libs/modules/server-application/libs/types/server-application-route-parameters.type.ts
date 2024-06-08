import {
  type FastifyReply,
  type FastifyRequest,
  type preHandlerHookHandler,
  type RouteGenericInterface
} from 'fastify';
import { HTTPMethod } from '~/libs/modules/http/http.js';
import { ValueOf, type ValidationSchema } from '~/libs/types/types.js';

type ServerApplicationRouteParameters = {
  url: string;
  method: ValueOf<typeof HTTPMethod>;
  preHandler?: preHandlerHookHandler;
  handler: <T extends RouteGenericInterface>(
    _request: FastifyRequest<T>,
    _reply: FastifyReply
  ) => Promise<unknown>;
  validation?: {
    body?: ValidationSchema;
  };
};

export { type ServerApplicationRouteParameters };

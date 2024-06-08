import { joinPath } from '~/libs/modules/path/path.js';
import {
  ControllerAPIHandler,
  ControllerAPIHandlerOptions,
  ControllerModule,
  ControllerRouteParameters
} from './libs/types/types.js';
import { LoggerModule } from '../logger/logger.js';
import { ServerApplicationRouteParameters } from '../server-application/server-application.js';

type Constructor = {
  apiPath: string;
  logger: LoggerModule;
};

class Controller implements ControllerModule {
  #apiPath: string;

  #routes: ServerApplicationRouteParameters[] = [];

  #logger: LoggerModule;

  public constructor({ logger, apiPath }: Constructor) {
    this.#logger = logger;
    this.#apiPath = apiPath;
  }

  public get routes(): ServerApplicationRouteParameters[] {
    return this.#routes;
  }

  private async mapHandler(
    handler: ControllerAPIHandler,
    request: Parameters<ServerApplicationRouteParameters['handler']>[0],
    reply: Parameters<ServerApplicationRouteParameters['handler']>[1]
  ): Promise<void> {
    this.#logger.info(`${request.method.toUpperCase()} on ${request.url}`);

    const handlerOptions = this.mapRequest(request);
    const { payload, status } = await handler(handlerOptions);

    return await reply.status(status).send(payload);
  }

  private mapRequest(
    request: Parameters<ControllerRouteParameters['handler']>[0]
  ): ControllerAPIHandlerOptions {
    const { body, params, query } = request;

    return {
      body,
      params,
      query
    };
  }

  public addRoute(options: ControllerRouteParameters): void {
    const { handler, url } = options;

    this.#routes.push({
      ...options,
      handler: (request, reply) => this.mapHandler(handler, request, reply),
      url: joinPath([this.#apiPath, url])
    });
  }
}

export { Controller };

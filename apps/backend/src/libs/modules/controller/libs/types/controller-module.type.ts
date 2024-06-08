import { ServerApplicationRouteParameters } from '~/libs/modules/server-application/libs/types/types.js';
import { ControllerRouteParameters } from './controller-route-parameters.type.js';

type ControllerModule = {
  routes: ServerApplicationRouteParameters[];
  addRoute(options: ControllerRouteParameters): void;
};

export { type ControllerModule };

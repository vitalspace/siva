import { HTTPmethods, SivaRequest, Route }  from "./types";

class Router {
  routes: Record<string, Route>;

  constructor() {
    this.routes = {};
  }

  add(method: HTTPmethods, path: string, handler: (request: Request) => Response) {
    if (this.routes[path]) {
      throw new Error(
        `Route ${path} already defined with method ${this.routes[path].method}`
      );
    }
    this.routes[path] = { method, handler };
  }

  lookup(path: string): Route {
    return this.routes[path];
  }
}

export { Router };
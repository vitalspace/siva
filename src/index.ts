import { Server } from "bun";
import { Router } from "./router";
import { SivaRequest, HTTPmethods, Handler } from "./types"; // Asegúrate de importar los tipos adecuados

class Siva {
  router: Router;

  constructor() {
    this.router = new Router();
  }

  fetch(request: SivaRequest): Promise<Response> {
    const { pathname } = new URL(request.url);

    const matched = this.router.lookup(pathname);

    if (!matched) {
      return Promise.resolve(new Response("Not Found", { status: 404 }));
    }

    if (matched.method !== request.method) {
      return Promise.resolve(
        new Response("Method Not Allowed", { status: 405 })
      );
    }

    request.params = matched.params || {};
    return Promise.resolve(matched.handler(request));
  }

  use<T extends string>(path: T, handler: Handler<T>, method: HTTPmethods) {
    this.router.add(method, path, handler);
  }

  get<T extends string>(path: T, handler: Handler<T>) {
    this.use(path, handler, "GET");
  }

  serve(options: any, callback?: (server: Server) => void) {
    const server = Bun.serve({
      ...options,
      fetch: (request) => this.fetch(request),
    });

    callback?.(server);
    return server;
  }
}

export { Siva };

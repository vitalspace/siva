import type { Server } from "bun";
import { Router } from "./router";

class Siva {
  request: any;
  router;

  constructor() {
    this.router = new Router();
  }

  fetch(request: Request) {
    const { pathname } = new URL(request.url);

    const matched = this.router.lookup(pathname);

    console.log(this.router)

    if (!matched) {
      return new Response("Not Found", { status: 404 });
    }

    if (matched.method !== request.method) {
      return new Response("Method Not Allowed", { status: 405 });
    }

    request.params = matched.params || {};
    return matched.handler(request);
  }

  use(path, handler, method) {
    this.router.add(method, path, handler);
  }

  get(path, handler) {
    this.use(path, handler, "GET");
  }

  serve(options, callback?: (server: Server) => void) {
    const server = Bun.serve({
      ...options,
      fetch: (request) => this.fetch(request),
    });

    callback?.(server);
    return server;
  }
}

export { Siva };

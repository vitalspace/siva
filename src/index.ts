import { Server } from "bun";
import { Router } from "./router";
import { SivaRequest, HTTPmethods, Handler } from "./types";

// Class representing a Siva http server
class Siva {
  router: Router;

  // Constructor to initialize the Siva http server
  constructor() {
    // Create a new instance of the Router class for routing
    this.router = new Router();
  }

  // Method to fetch and process incoming requests
  fetch(request: SivaRequest): Promise<Response> {
    // Extract the pathname from the request URL
    const { pathname } = new URL(request.url);

    // Look up a route that matches the pathname
    const matched = this.router.lookup(pathname);

    if (!matched) {
      // If no matching route is found, return a 404 Not Found response
      return Promise.resolve(new Response("Not Found", { status: 404 }));
    }

    if (matched.method !== request.method) {
      // If the HTTP method doesn't match, return a 405 Method Not Allowed response
      return Promise.resolve(
        new Response("Method Not Allowed", { status: 405 })
      );
    }

    // Set request parameters based on the matched route, if any
    request.params = matched.params || {};

    // Call the handler associated with the route and return its response
    return Promise.resolve(matched.handler(request));
  }

  // Method to add a route with a specific HTTP method and path
  use<T extends string>(path: T, handler: Handler<T>, method: HTTPmethods) {
    // console.log(path, method,  handler)
    this.router.add(method, path, handler);
  }

  // Convenience method to add a route with the HTTP GET method
  get<T extends string>(path: T, handler: Handler<T>) {
    this.use(path, handler, 'GET')
  }
  
  post<T extends string>(path: T, handler: Handler<T>) {
    this.use(path, handler, 'POST')
  }

  // Method to serve the Siva http server on a specified server
  serve(options: any, callback?: (server: Server) => void) {
    // Create a Bun server instance with the provided options
    const server = Bun.serve({
      ...options,
      fetch: (request) => this.fetch(request), // Use the fetch method to handle requests
    });

    // Call the callback function with the server instance, if provided
    callback?.(server);

    // Return the server for further use
    return server;
  }
}

// Export the Siva class for use in other modules
export { Siva };

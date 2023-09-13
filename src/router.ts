import { HTTPmethods, Route } from "./types";

// Class representing a simple router
class Router {
  routes: Record<string, Route>;

  // Constructor to initialize the router
  constructor() {
    // Initialize an empty object to store routes
    this.routes = {};
  }

  // Method to add a new route to the router
  add(
    method: HTTPmethods,
    path: string,
    handler: (request: Request) => Response
  ) {
    // Check if the route already exists
    if (this.routes[path]) {
      // If the route exists, throw an error indicating the conflict
      throw new Error(
        `Route ${path} already defined with method ${this.routes[path].method}`
      );
    }

    // If the route doesn't exist, add it to the routes object
    this.routes[path] = { method, params: {}, handler };
  }

  // Method to look up a route by its path
  lookup(path: string): Route {
    // Return the route associated with the provided path
    return this.routes[path];
  }
}

// Export the Router class for use in other modules
export { Router };

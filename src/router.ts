class Router {
  routes: any;
  constructor() {
    this.routes = {};
  }

  add(method, path, handler) {
    if (this.routes[path]) {
      throw new Error(
        `Route ${path} already defined with method ${this.routes[path].method}`
      );
    }
    this.routes[path] = { method, handler };
  }

  lookup(path) {
    return this.routes[path];
  }
}

export { Router }
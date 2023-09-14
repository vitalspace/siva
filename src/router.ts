import { HTTPmethods, Route } from "./types";

class Router {
  staticRoutes: Record<string, Route>;
  paramRoutes: Map<
    string,
    {
      paramName: string;
      method: HTTPmethods;
      handler: (request: Request) => Response;
    }
  >;

  constructor() {
    this.staticRoutes = {};
    this.paramRoutes = new Map();
  }

  add(
    method: HTTPmethods,
    path: string,
    handler: (request: Request) => Response
  ) {
    if (this.staticRoutes[path] || this.paramRoutes.has(path.split(":")[0])) {
      throw new Error(`Route ${path} already defined`);
    }

    if (path.includes("/:")) {
      const [staticPart, paramName] = path.split(":");
      this.paramRoutes.set(staticPart, { paramName, method, handler });
    } else {
      this.staticRoutes[path] = { method, handler };
    }
  }

  lookup(path: string): Route {
    if (this.staticRoutes[path]) {
      return this.staticRoutes[path];
    }

    const routeParts = path.split("/");
    const filteredArray = [...new Set(routeParts.filter((el) => el !== ""))];
    const allExceptLast = filteredArray.slice(0, -1);
    const res = "/" + allExceptLast.join("/") + "/";
    const paramRoute = this.paramRoutes.get(res);
    const paramValue = routeParts.pop();

    if (paramRoute) {
      return {
        method: paramRoute.method,
        params: { [paramRoute.paramName]: paramValue },
        handler: paramRoute.handler,
      };
    }
  }
}

export { Router };

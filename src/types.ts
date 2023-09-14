// Type and interface definitions

// Allowed HTTP methods
export type HTTPmethods = "GET" | "PATCH" | "POST" | "PUT" | "DELETE";

// Utility for extracting parameters from a URL
export type ParamsFromUrl<T extends string> =
  T extends `${string}/:${infer Param}/${infer Rest}`
    ? Param | ParamsFromUrl<`/${Rest}`>
    : T extends `${string}/:${infer Param}`
    ? Param
    : never;

// Interface extending the Request interface with a 'params' property
export interface SivaRequest<T extends string = ''> extends Request {
    params?: Record<ParamsFromUrl<T>, string>
}
  
// Interface representing a route in the router
export interface Route {
  params?: {}; // This property could be used to specify route-specific parameters
  method: HTTPmethods | "ALL"; // Allowed HTTP method for this route
  handler: (request: SivaRequest) => Response; // Function that handles the request for this route
}

// Generic type to define route handlers with typed route parameters
export type Handler<T extends string> = (request: SivaRequest<T>) => Response;

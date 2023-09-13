export type HTTPmethods = "GET" | "PATCH" | "POST" | "PUT" | "DELETE";

export type ParamsFromUrl<T extends string> =
  T extends `${string}/:${infer Param}/${infer Rest}`
    ? Param | ParamsFromUrl<`/${Rest}`>
    : T extends `${string}/:${infer Param}`
    ? Param
    : never;

export interface SivaRequest<T extends string = ""> extends Request {
  params?: Record<ParamsFromUrl<T>, string>;
}

export interface Route {
  params: {};
  method: HTTPmethods | "ALL";
  handler: (request: SivaRequest) => Response;
}


export type Handler<T extends string> = (request: SivaRequest<T>) => Response
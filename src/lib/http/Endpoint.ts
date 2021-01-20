import { HttpMethod, RouteCallback } from './index'

export class Endpoint {
  private httpMethod: HttpMethod = 'GET'
  private routePath = '/'
  private routeCallback: RouteCallback = () => null

  constructor(
    httpMethod?: HttpMethod,
    routePath?: string,
    routeCallback?: RouteCallback,
  ) {
    if (httpMethod !== undefined) this.setMethod(httpMethod)
    if (routePath !== undefined) this.setPath(routePath)
    if (routeCallback !== undefined) this.setCallback(routeCallback)
  }

  public getMethod(): HttpMethod {
    return this.httpMethod
  }

  public setMethod(httpMethod: HttpMethod): Endpoint {
    this.httpMethod = httpMethod
    return this
  }

  public getPath(): string {
    return this.routePath
  }

  public setPath(routePath: string): Endpoint {
    this.routePath = routePath.startsWith('/')
      ? routePath
      : `/${routePath}`
    return this
  }

  public getCallback(): RouteCallback {
    return this.routeCallback
  }

  public setCallback(routeCallback: RouteCallback): Endpoint {
    this.routeCallback = routeCallback
    return this
  }

  public isDuplicateOf(endpoint: Endpoint): boolean {
    return (
      this.httpMethod === endpoint.httpMethod &&
      this.routePath === endpoint.routePath
    )
  }

  public static doEndpointArraysOverlap(
    endpointsA: Endpoint[],
    endpointsB: Endpoint[],
  ): boolean {
    return endpointsA.some((a) =>
      endpointsB.some((b) => b.isDuplicateOf(a)),
    )
  }
}

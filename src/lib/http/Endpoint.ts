import { Context } from 'koa'
import { ServiceTask, Result } from '../service/index'
import { Response, Request } from './index'
import { HttpMethod, RouteCallback } from './types'

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

  public useService<I,O>(task: ServiceTask<I,O>, mapRequest: (request: Request) => I, mapResponse: (result: Result<O | undefined>) => Response): this {
    this.setCallback((context: Context) => {
      const request = Request.fromKoaContext(context)
      const taskInput = mapRequest(request)
      const taskOutput = task.perform(taskInput)
      const response = mapResponse(taskOutput)
      context.status = response.getStatusCode()
      context.message = response.getStatusMessage()
      context.body = response.getBody()
      // context.body = "JD"
      // context = Endpoint.mergeResponseToContext(context, response)
    })
    return this
  }

//   private static mergeResponseToContext(context : Context, response: Response): Context {
//     console.log(`
// Merging response to context:
//     response: ${JSON.stringify(response)}
//     `)
//     return {
//       ...context,
//       status: response.getStatusCode(),
//       message: response.getStatusMessage(),
//       header: response.getHeadersAsObject(),
//       body: response.getBody(),
//     }
//   }
}

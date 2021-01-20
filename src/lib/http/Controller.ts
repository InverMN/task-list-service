import Router from 'koa-router'
import { DuplicatedEndpointError } from './errors/index'
import { Endpoint } from './index'
import { HttpMethod } from './types'

export class Controller {
  private linkedEndpoints: Endpoint[]
  private router: Router

  public getEndpoints(): Endpoint[] {
    return this.linkedEndpoints
  }

  public getRouter(): Router {
    return this.router
  }

  constructor() {
    this.linkedEndpoints = []
    this.router = new Router()
  }

  public link(newEndpoint: Endpoint): void {
    if (!this.containsEndpoint(newEndpoint)) {
      this.linkEndpointWithRouter(newEndpoint)
      this.pushEndpointToRegistry(newEndpoint)
    } else throw new DuplicatedEndpointError()
  }

  private linkEndpointWithRouter(endpoint: Endpoint) {
    const routeMethod = endpoint.getMethod().toLowerCase()
    // @ts-ignore
    this.router[routeMethod](
      endpoint.getPath(),
      endpoint.getCallback(),
    )
  }

  private pushEndpointToRegistry(endpoint: Endpoint) {
    this.linkedEndpoints.push(endpoint)
  }

  public containsEndpoint(testedEndpoint: Endpoint): boolean {
    return (
      this.findEndpoint(
        testedEndpoint.getMethod(),
        testedEndpoint.getPath(),
      ) !== undefined
    )
  }

  public findEndpoint(
    httpMethod: HttpMethod,
    routePath: string,
  ): Endpoint | undefined {
    return this.linkedEndpoints.find((containedEndpoint) =>
      containedEndpoint.isDuplicateOf(
        new Endpoint(httpMethod, routePath),
      ),
    )
  }

  public merge(relativePath: string, controller: Controller): void {
    const path = relativePath.startsWith('/')
      ? relativePath
      : `/${relativePath}`

    if (
      path === '/' &&
      this.doExternalEndpointsDuplicate(controller.getEndpoints())
    )
      throw new DuplicatedEndpointError()

    this.mergeEndpointsRegistries(path, controller.getEndpoints())
    this.mergeRouters(path, controller.getRouter())
  }

  private mergeEndpointsRegistries(
    path: string,
    endpoints: Endpoint[],
  ) {
    const modifiedExternalEndpoints = endpoints.map(
      (singleEndpoint) => {
        singleEndpoint.setPath(singleEndpoint.getPath() + path)
        return singleEndpoint
      },
    )

    this.linkedEndpoints = [
      ...this.getEndpoints(),
      ...modifiedExternalEndpoints,
    ]
  }

  private mergeRouters(path: string, router: Router) {
    this.router.use(path, router.routes())
  }

  private doExternalEndpointsDuplicate(
    externalEndpoints: Endpoint[],
  ): boolean {
    return Endpoint.doEndpointArraysOverlap(
      this.linkedEndpoints,
      externalEndpoints,
    )
  }
}

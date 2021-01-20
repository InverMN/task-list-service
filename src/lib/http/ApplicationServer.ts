import Koa from 'koa'
import { Server } from 'http'
import { Controller } from './index'
import { NoRootControllerError } from './errors/index'

export class ApplicationServer {
  private koaApplication: Koa
  private rootController?: Controller

  public getRootController(): Controller | undefined {
    return this.rootController
  }

  public setRootController(controller: Controller): void {
    this.rootController = controller
  }

  public createRootController(): Controller {
    const controller = new Controller()
    this.rootController = controller
    return controller
  }

  constructor() {
    this.koaApplication = new Koa()
  }

  public start(port?: number): Server {
    this.linkRootControllerRoutes()
    return this.koaApplication.listen(port)
  }

  private linkRootControllerRoutes(): void {
    const controller = this.getRootController()
    if (controller === undefined) throw new NoRootControllerError()
    const router = controller.getRouter()

    this.koaApplication
      .use(router.routes())
      .use(router.allowedMethods())
  }
}

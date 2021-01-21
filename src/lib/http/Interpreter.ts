import { Context as KoaContext } from 'koa'
import { Context as ApplicationContext } from '../service/index'

export class Interpreter {
  public static httpIntoContext(
    koaContext: KoaContext,
  ): ApplicationContext {
    const applicationContext = new ApplicationContext()
    applicationContext.data = koaContext.body
    return applicationContext
  }
}

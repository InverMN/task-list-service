import { Context, Result, Ok, Err } from './index'

export class Service {}

export function ServiceAction<T>(
  fun: (context?: Context) => T,
): (context?: Context) => Result<T | undefined> {
  return function (context?: Context) {
    try {
      return Ok(fun(context))
    } catch (error) {
      return Err(error)
    }
  }
}

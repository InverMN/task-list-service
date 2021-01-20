import { Context } from 'koa'

export type RouteCallback = (context: Context) => void
export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

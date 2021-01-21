import Koa from 'koa'
import { Interpreter } from './lib/http/index'
import supertest from 'supertest'

const server = new Koa()
server.use(async (ctx) => {
  const context = Interpreter.httpIntoContext(ctx)
  console.log(context)
})

supertest(server.listen()).get('/').end()

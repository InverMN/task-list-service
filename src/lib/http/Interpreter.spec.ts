import { Interpreter } from './index'
import Koa from 'koa'
import supertest from 'supertest'

describe('Interpreter', () => {
  it('initializes new instance', () => {
    expect(new Interpreter()).not.toBeUndefined()
  })

  it('transforms http request into application context', async (done) => {
    const server = new Koa()
    server.use(async (ctx) => {
      const context = Interpreter.httpIntoContext(ctx)
      expect(context).not.toBeUndefined()
      done()
    })
    supertest(server.listen()).get('/').end()
  })
})

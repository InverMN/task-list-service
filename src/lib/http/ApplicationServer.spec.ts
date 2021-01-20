import supertest from 'supertest'
import { ApplicationServer, Controller, Endpoint } from './index'
import { AddressInfo } from 'net'

describe('Application Server', () => {
  it('creates new instance', () => {
    expect(new ApplicationServer()).not.toBeUndefined()
  })

  it('returns response', () => {
    const application = new ApplicationServer()
    application.createRootController()
    const endpoint = new Endpoint().setCallback(
      (context) => (context.body = 'hello world'),
    )
    application.getRootController()?.link(endpoint)
    const request = supertest(application.start())
    request.get('/').expect('hello world')
  })

  it('listens on specified port', () => {
    const application = new ApplicationServer()
    application.createRootController()
    const server = application.start(8080)
    const address = server.address() as AddressInfo
    expect(address.port).toBe(8080)
  })

  it('initializes without root controller', () => {
    const application = new ApplicationServer()
    expect(application.getRootController()).toBeUndefined()
  })

  it('allows to set root controller', () => {
    const application = new ApplicationServer()
    const controller = new Controller()
    application.setRootController(controller)
    expect(application.getRootController()).toBe(controller)
  })

  it('throws exception attempting to run start() when no root controller present', () => {
    const application = new ApplicationServer()
    const startInvocation = () => {
      application.start()
    }
    expect(startInvocation).toThrow(Error)
  })

  it('creates default root controller', () => {
    const application = new ApplicationServer()
    application.createRootController()
    expect(application.getRootController()).not.toBeUndefined()
  })

  it("listens to root controller's endpoints", () => {
    const application = new ApplicationServer()
    application.createRootController()
    const endpoint = new Endpoint(
      'POST',
      '/users',
      (context) => (context.body = 'hello there'),
    )
    application.getRootController()?.link(endpoint)
    const server = application.start()
    const request = supertest(server)
    request.post('/users').expect('hello there')
  })
})

import { Controller, Endpoint } from './index'

describe('Controller', () => {
  it('creates new instance', () => {
    expect(new Controller()).toBeDefined()
  })

  it('adds new endpoint', () => {
    const controller = new Controller()
    const endpoint = new Endpoint()
    controller.link(endpoint)
    expect(controller.getEndpoints()).toEqual([endpoint])
  })

  it('throws exception when route duplicates', () => {
    const controller = new Controller()
    const endpointsAll = [new Endpoint(), new Endpoint()]
    const linkInvocation = () => {
      endpointsAll.forEach((singleEndpoint) =>
        controller.link(singleEndpoint),
      )
    }
    expect(linkInvocation).toThrow(Error)
  })

  it('lists all endpoints', () => {
    const controller = new Controller()
    const endpointsAll = [
      new Endpoint('DELETE'),
      new Endpoint('GET', '/users'),
      new Endpoint(),
    ]
    endpointsAll.forEach((singleEndpoint) =>
      controller.link(singleEndpoint),
    )
    expect(controller.getEndpoints()).toEqual(endpointsAll)
  })

  it('finds endpoint for params', () => {
    const controller = new Controller()
    const targetEndpoint = new Endpoint('DELETE')
    const endpointsAll = [
      targetEndpoint,
      new Endpoint('GET', '/users'),
    ]
    endpointsAll.forEach((singleEndpoint) =>
      controller.link(singleEndpoint),
    )
    expect(controller.findEndpoint('DELETE', '/')).toBe(
      targetEndpoint,
    )
  })

  it('initializes with empty router', () => {
    const controller = new Controller()
    expect(controller.getRouter()).toBeDefined()
  })

  it("attaches new endpoint to inner controller's router", () => {
    const controller = new Controller()
    const endpoint = new Endpoint()
    controller.link(endpoint)
    expect(controller.getRouter().stack.length).toEqual(1)
  })

  it('merges with other controller', () => {
    const controllerA = new Controller()
    const endpointA = new Endpoint()
    controllerA.link(endpointA)

    const controllerB = new Controller()
    const endpointB = new Endpoint('POST')
    controllerB.link(endpointB)

    controllerA.merge('/', controllerB)
    expect(controllerA.getRouter().stack.length).toEqual(2)
  })

  it('throws exception when merging occurs two duplicated endpoints', () => {
    const controllerA = new Controller()
    const endpointA = new Endpoint()
    controllerA.link(endpointA)

    const controllerB = new Controller()
    const endpointB = new Endpoint()
    controllerB.link(endpointB)

    const mergeInvocation = () => controllerA.merge('/', controllerB)
    expect(mergeInvocation).toThrow(Error)
  })
})

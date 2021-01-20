import { Endpoint } from './index'

describe('Endpoint', () => {
  it('creates new blank instance', () => {
    const endpoint = new Endpoint()
    expect(endpoint.getMethod()).toEqual('GET')
    expect(endpoint.getPath()).toEqual('/')
  })

  it('creates with http method', () => {
    const endpoint = new Endpoint().setMethod('POST')
    expect(endpoint.getMethod()).toEqual('POST')
  })

  it('creates with path', () => {
    const endpoint = new Endpoint().setPath('/ping')
    expect(endpoint.getPath()).toEqual('/ping')
  })

  it('creates with callback', () => {
    const callback = () => null
    const endpoint = new Endpoint().setCallback(callback)
    expect(endpoint.getCallback()).toBe(callback)
  })

  it('add slash "/" at beginning of path if not present', () => {
    const endpoint = new Endpoint().setPath('users')
    expect(endpoint.getPath()).toEqual('/users')
  })

  it('creates with all options passed to constructor', () => {
    const callback = () => 2 + 2
    const endpoint = new Endpoint('POST', 'users', callback)
    expect(endpoint.getMethod()).toEqual('POST')
    expect(endpoint.getPath()).toEqual('/users')
    expect(endpoint.getCallback()).toBe(callback)
  })

  it('detects whenever endpoints are duplicates', () => {
    const endpointA = new Endpoint()
    const endpointB = new Endpoint()
    const endpointC = new Endpoint('POST')

    expect(endpointA.isDuplicateOf(endpointB)).toBe(true)
    expect(endpointA.isDuplicateOf(endpointC)).toBe(false)
  })

  it('detects whenever two arrays overlap', () => {
    const endpointA = new Endpoint()
    const endpointB = new Endpoint('DELETE')
    const endpointC = new Endpoint('POST')
    const endpointD = new Endpoint('GET', '/login')

    const arrayA = [endpointA, endpointB]
    const arrayB = [endpointC, endpointD]

    expect(Endpoint.doEndpointArraysOverlap(arrayA, arrayB)).toBe(
      false,
    )

    arrayB.push(endpointA)
    expect(Endpoint.doEndpointArraysOverlap(arrayA, arrayB)).toBe(
      true,
    )
  })
})

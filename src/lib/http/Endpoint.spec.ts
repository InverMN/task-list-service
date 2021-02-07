import { ServiceTask, Protector, Result } from '../service/index'
import { Endpoint, Request, Response } from './index'
import ExampleKoaContext from '../../resources/ExampleKoaContext'

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

  it('allows to bind service task with request and response interpreters', () => {
    const action = ({ name, surname }: { name: string, surname: string }) => `${name} ${surname}`
    const task = new ServiceTask(action)
      .addProtector(new Protector(({ name }) => name.length > 3))
      .createProtector(({ surname }) => surname.length > 5)
    
    const mapRequest = (request: Request) => {
      const { name, surname } = request.getJsonBody()
      if(!name || !surname) throw new Error()
      return { name, surname }
    }
    const mapResponse = (result: Result<string | undefined>) => {
      const response = new Response()
      if(result.isOk())
        response.setBody(result.unwrap() as string)
      else
        response.setStatusCode(400)
        
      return response
    }
    const endpoint = new Endpoint().useService(task, mapRequest, mapResponse)
    const callback = endpoint.getCallback()
    const context = { ...ExampleKoaContext }
    const endpointInvocation = () => callback(context)
    expect(endpointInvocation).toThrow(Error)
  })
})

import { Service, ServiceAction, Ok } from './index'
import { Err } from './Result'

describe('Service', () => {
  it('creates new instance', () => {
    expect(new Service()).toBeDefined()
  })
})

describe('ServiceAction', () => {
  it('transforms return T to Ok(T)', () => {
    const rawMethod = () => 'hello'
    const serviceAction = ServiceAction(rawMethod)
    expect(serviceAction()).toBeDefined()
    expect(serviceAction()).toEqual(Ok('hello'))
  })

  it('transforms throw E into return Err(E)', () => {
    const rawMethod = () => {
      throw new Error()
    }
    const serviceAction = ServiceAction(rawMethod)
    expect(serviceAction()).toEqual(Err(new Error()))
  })
})

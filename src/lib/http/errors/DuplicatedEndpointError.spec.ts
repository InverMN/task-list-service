import { DuplicatedEndpointError } from './index'

describe('Duplicated Endpoint Error', () => {
  it('initializes new instance', () => {
    expect(new DuplicatedEndpointError()).toBeDefined()
  })

  it('has name and message properties', () => {
    const error = new DuplicatedEndpointError()
    expect(error.name).toEqual('DuplicatedEndpointError')
    expect(error.message).toEqual(
      'Endpoint with identical path and method already exists in target controller',
    )
  })
})

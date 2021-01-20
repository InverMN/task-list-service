import { NoRootControllerError } from './index'

describe('NoRootControllerError', () => {
  it('initializes new instance', () => {
    expect(new NoRootControllerError()).not.toBeUndefined()
  })

  it('has name and message properties', () => {
    const error = new NoRootControllerError()
    expect(error.name).toEqual('NoRootControllerError')
    expect(error.message).toEqual(
      'Root controller is not present in application server',
    )
  })
})

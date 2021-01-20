export class NoRootControllerError extends Error {
  constructor() {
    super()
    this.name = 'NoRootControllerError'
    this.message =
      'Root controller is not present in application server'
  }
}

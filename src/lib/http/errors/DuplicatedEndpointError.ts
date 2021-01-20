export class DuplicatedEndpointError extends Error {
  constructor() {
    super()
    this.name = 'DuplicatedEndpointError'
    this.message =
      'Endpoint with identical path and method already exists in target controller'
  }
}

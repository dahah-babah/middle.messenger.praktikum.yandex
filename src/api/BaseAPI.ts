import HTTPTransport from 'src/core/HTTP'

abstract class BaseAPI {
  protected http: HTTPTransport

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint)
  }
}

export default BaseAPI

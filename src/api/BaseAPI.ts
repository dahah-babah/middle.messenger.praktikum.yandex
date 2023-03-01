import HTTPTransport from '@/core/HTTP'

abstract class BaseAPI {
  protected http: HTTPTransport

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint)
  }
}

export default BaseAPI

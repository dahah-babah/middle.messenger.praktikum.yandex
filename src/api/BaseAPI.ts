import { HTTPTransport } from '@/core/HTTP'
import { API_URL } from '@/constants/url'

abstract class BaseAPI {
  protected http: HTTPTransport

  protected constructor(path: string) {
    const endpoint = `${API_URL}${path}`

    this.http = new HTTPTransport(endpoint)
  }
}

export default BaseAPI

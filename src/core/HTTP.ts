enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type TMethod = 'GET' | 'PUT' | 'POST' | 'DELETE'

type THeader = { [key: string]: string }

type TData = { [key: string]: any }

type TOptions = {
  method: TMethod
  headers?: THeader
  data?: unknown
}

type HTTPMethod = (path: string, options?: TData) => Promise<any>

function queryStringify(data: TData) {
  return `?${Object.entries(data)
    .map((param) => param.join('='))
    .join('&')}`
}

class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2'

  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
  }

  get: HTTPMethod = (path, data) => {
    const url = this.endpoint + path
    const query = url.concat(queryStringify(data || {}))

    return this.request(query, {
      ...data,
      method: METHODS.GET as TMethod,
    })
  }

  post: HTTPMethod = (path, data) =>
    this.request(this.endpoint + path, {
      data,
      method: METHODS.POST as TMethod,
    })

  put: HTTPMethod = (path, data) =>
    this.request(this.endpoint + path, {
      ...data,
      method: METHODS.PUT as TMethod,
    })

  delete: HTTPMethod = (path, data) =>
    this.request(this.endpoint + path, {
      ...data,
      method: METHODS.DELETE as TMethod,
    })

  request = (url: string, options: TOptions): Promise<XMLHttpRequest> => {
    const { method, data, headers = {} } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, url)

      xhr.setRequestHeader('Content-Type', 'application/json')

      Object.entries<string>(headers).forEach(([key, value]) => {
        if (!key || !value) return
        xhr.setRequestHeader(key, value)
      })

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.onabort = () => reject(new Error('Abort'))
      xhr.onerror = () => reject(new Error('Network error'))
      xhr.ontimeout = () => reject(new Error('Timeout'))

      xhr.withCredentials = true
      xhr.responseType = 'json'

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}

export default HTTPTransport

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type TMethod = 'GET' | 'PUT' | 'POST' | 'DELETE'

type THeader = { [key: string]: string }

type TData = { [key: string]: unknown }

type TOptions = {
  method: TMethod
  headers: THeader
  data: unknown
  timeout: number
  retries: number
}

type HTTPMethod = (url: string, options: TOptions) => Promise<XMLHttpRequest>

function queryStringify(data: TData) {
  return `?${Object.entries(data)
    .map((param) => param.join('='))
    .join('&')}`
}

class HTTPTransport {
  get: HTTPMethod = (url, options) => {
    const query = url.concat(queryStringify((options.data as TData) || {}))
    return this.request(query, {
      ...options,
      method: METHODS.GET as TMethod,
      timeout: options.timeout,
    })
  }

  post: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.POST as TMethod, timeout: options.timeout })

  put: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.PUT as TMethod, timeout: options.timeout })

  delete: HTTPMethod = (url, options) =>
    this.request(url, { ...options, method: METHODS.DELETE as TMethod, timeout: options.timeout })

  request = (url: string, options: TOptions): Promise<XMLHttpRequest> => {
    const { method, data, headers = {}, timeout = 5000, retries } = options

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.open(method, url)

      Object.entries<string>(headers).forEach(([key, value]) => {
        if (!key || !value) return
        xhr.setRequestHeader(key, value)
      })

      if (retries <= 1) {
        reject(xhr)
      }

      xhr.onload = () => {
        resolve(xhr)
      }

      xhr.timeout = timeout

      xhr.onabort = reject
      xhr.onerror = reject
      xhr.ontimeout = reject

      if (method === METHODS.GET || !data) {
        xhr.send()
      } else {
        xhr.send(JSON.stringify(data))
      }
    })
  }
}

export default HTTPTransport

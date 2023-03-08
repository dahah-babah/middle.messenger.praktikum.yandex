import { HTTPTransport } from '@/core/HTTP'
import { queryStringify } from '@/core/HTTP/utils'

const firstPost = {
  userId: 1,
  id: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
}

describe('HTTP', () => {
  describe('Correct query string', () => {
    beforeEach(() => {
      console.error = jest.fn()
    })

    test.each([{}, { a: 0, b: '1', c: null }])('Should return string', (data) => {
      expect(queryStringify(data)).toContain('?')
      expect(console.error).not.toHaveBeenCalled()
    })
  })

  describe('HTTP methods', () => {
    const testEndpoint = 'https://jsonplaceholder.typicode.com'

    let http: HTTPTransport

    beforeAll(() => {
      http = new HTTPTransport(testEndpoint)

      console.error = jest.fn()
    })

    test('GET', async () => {
      try {
        const data = await http.get('/posts/1')

        expect(data).toEqual(firstPost)
      } catch (error) {
        console.error(error)
      } finally {
        expect(console.error).not.toHaveBeenCalled()
      }
    })

    test('PUT', async () => {
      try {
        const data = await http.put('/posts/1', firstPost)

        expect(data).toEqual(firstPost)
      } catch (error) {
        console.error(error)
      } finally {
        expect(console.error).not.toHaveBeenCalled()
      }
    })

    test('POST', async () => {
      try {
        const data = await http.post('/posts', firstPost)

        expect(data).not.toBeNull()
        expect(data).not.toBeUndefined()
      } catch (error) {
        console.error(error)
      } finally {
        expect(console.error).not.toHaveBeenCalled()
      }
    })

    test('DELETE', async () => {
      try {
        const data = await http.delete('/posts/1')

        expect(JSON.stringify(data)).toEqual('{}')
      } catch (error) {
        console.error(error)
      } finally {
        expect(console.error).not.toHaveBeenCalled()
      }
    })
  })
})

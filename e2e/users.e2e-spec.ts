import * as request from 'supertest'
import { mockUserCreationParams } from 'domain/use-cases/user-creation/mock'
import { HttpStatusCode } from 'presentation/protocols/http'
import { checkIfObjectKeyExist } from './helpers'
import { getAuthToken } from './helpers/get-auth-token'

describe('Users Route (e2e)', () => {
  let bearerToken: string
  const url = 'http://localhost:3000'
  const path = '/users'

  beforeAll(async () => {
    bearerToken = await getAuthToken()
  })

  describe('POST /users', () => {
    it('should respond user data', () => {
      const params = mockUserCreationParams()

      return request(url)
        .post(path)
        .set({ Authorization: bearerToken })
        .send(params)
        .expect(HttpStatusCode.CREATED)
        .expect((res) => {
          checkIfObjectKeyExist(res.body, 'data')
        })
    })

    it('should respond bad request if request is missing params', () => {
      const params = mockUserCreationParams()
      delete params.name

      return request(url)
        .post(path)
        .set({ Authorization: bearerToken })
        .send(params)
        .expect(HttpStatusCode.BAD_REQUEST)
        .expect((res) => {
          checkIfObjectKeyExist(res.body, 'errors')
        })
    })

    it('should not allow request without token', () => {
      const params = mockUserCreationParams()
      delete params.name

      return request(url)
        .post(path)
        .send(params)
        .expect(HttpStatusCode.UNAUTHORIZED)
    })
  })
})

import * as request from 'supertest'
import { mockUserCreaterParams } from 'domain/use-cases/user-creater/mock'
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
      const params = mockUserCreaterParams()

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
      const params = mockUserCreaterParams()
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
  })
})

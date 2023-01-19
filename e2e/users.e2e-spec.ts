import * as request from 'supertest'
import { mockUserCreaterParams } from 'domain/use-cases/user-creater/mock'
import { HttpStatusCode } from 'presentation/protocols/http'
import { checkIfObjectKeyExist } from './helpers'

describe('Users Route (e2e)', () => {
  const url = 'http://localhost:3000'
  const path = '/users'

  describe('POST /users', () => {
    it('should respond user data', () => {
      const params = mockUserCreaterParams()

      return request(url)
        .post(path)
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
        .send(params)
        .expect(HttpStatusCode.BAD_REQUEST)
        .expect((res) => {
          checkIfObjectKeyExist(res.body, 'errors')
        })
    })
  })
})

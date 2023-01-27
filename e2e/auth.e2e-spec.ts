import * as request from 'supertest'
import { HttpStatusCode } from 'presentation/protocols/http'
import { checkIfObjectKeyExist } from './helpers'
import { mockUserAuthenticationParams } from 'domain/use-cases/user-authentication/mock'
import { mockUserCreaterParams } from 'domain/use-cases/user-creater/mock'
import { UserCreaterParams } from 'domain/use-cases/user-creater'

describe('Users Route (e2e)', () => {
  const url = 'http://localhost:3000'
  const path = '/auth'
  let userCreaterParams: UserCreaterParams

  beforeAll(() => {
    userCreaterParams = mockUserCreaterParams()

    return request(url).post('/users').send(userCreaterParams)
  })

  describe('POST /auth', () => {
    it('should respond auth user data', () => {
      return request(url)
        .post(path)
        .send({
          email: 'lucas@gmail.com',
          password: 'testas22',
        })
        .expect(HttpStatusCode.OK)
        .expect((res) => {
          checkIfObjectKeyExist(res.body.data, 'token')
        })
    })

    it('should respond bad request if request is missing params', () => {
      const params = mockUserAuthenticationParams()
      delete params.password

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

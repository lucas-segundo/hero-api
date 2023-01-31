import * as request from 'supertest'
import { HttpStatusCode } from 'presentation/protocols/http'
import { checkIfObjectKeyExist } from './helpers'
import { getAuthToken } from './helpers/get-auth-token'
import { mockRaceCreationParams } from 'domain/use-cases/race-creation/mock'
import { RaceCreationParams } from 'domain/use-cases/race-creation'

describe('Races Route (e2e)', () => {
  let bearerToken: string
  let params: RaceCreationParams
  const url = 'http://localhost:3000'
  const path = '/races'

  beforeAll(async () => {
    bearerToken = await getAuthToken()
  })

  beforeEach(() => {
    params = mockRaceCreationParams()
  })

  describe('POST /races', () => {
    it('should respond user data', () => {
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
      delete params.title

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
      return request(url)
        .post(path)
        .send(params)
        .expect(HttpStatusCode.UNAUTHORIZED)
    })
  })
})

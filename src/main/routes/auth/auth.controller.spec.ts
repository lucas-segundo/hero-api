import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthenticatedUser } from 'domain/use-cases/user-authentication'
import {
  mockAuthenticatedUser,
  mockUserAuthenticationParams,
} from 'domain/use-cases/user-authentication/mock'
import { mockExpressResponse } from 'main/helpers/mock-express-response'
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { makeUserAuthModule } from './factory.module'

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      makeUserAuthModule()
    ).compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call auth with right params', async () => {
    const authSpy = jest.spyOn(service, 'auth')
    const res = mockExpressResponse()

    const dto = mockUserAuthenticationParams()
    await controller.auth(dto, res)

    expect(authSpy).toBeCalledWith(dto)
  })

  it('should respond with right data', async () => {
    const authSpy = jest.spyOn(service, 'auth')
    const res = mockExpressResponse()

    const response: HttpResponse<AuthenticatedUser> = {
      data: mockAuthenticatedUser(),
      statusCode: HttpStatusCode.OK,
    }
    authSpy.mockResolvedValueOnce(response)

    const dto = mockUserAuthenticationParams()
    await controller.auth(dto, res)

    expect(res.status).toBeCalledWith(response.statusCode)
    expect(res.send).toBeCalledWith({ data: response.data })
  })

  it('should respond with right errors if something fails', async () => {
    const authSpy = jest.spyOn(service, 'auth')
    const result: HttpErrorResponse = {
      errors: [faker.random.words()],
      statusCode: faker.internet.httpStatusCode({
        types: ['serverError', 'clientError'],
      }),
    }
    authSpy.mockResolvedValueOnce(result)

    const res = mockExpressResponse()
    const dto = mockUserAuthenticationParams()
    await controller.auth(dto, res)

    expect(res.status).toBeCalledWith(result.statusCode)
    expect(res.send).toBeCalledWith({ errors: result.errors })
  })
})

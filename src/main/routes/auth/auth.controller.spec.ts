import { Test, TestingModule } from '@nestjs/testing'
import { AuthenticatedUser } from 'domain/use-cases/user-authentication'
import {
  mockAuthenticatedUser,
  mockUserAuthenticationParams,
} from 'domain/use-cases/user-authentication/mock'
import { mockExpressResponse } from 'main/helpers/mock-express-response'
import { HttpResponse, HttpStatusCode } from 'presentation/protocols/http'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { mockUserAuthModule } from './mock.module'

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      mockUserAuthModule()
    ).compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call auth with right params', async () => {
    const serviceAuthSpy = jest.spyOn(service, 'auth')
    const res = mockExpressResponse()

    const authDto = mockUserAuthenticationParams()
    await controller.auth(authDto, res)

    expect(serviceAuthSpy).toBeCalledWith(authDto)
  })

  it('should respond with right data', async () => {
    const serviceAuthSpy = jest.spyOn(service, 'auth')
    const res = mockExpressResponse()

    const response: HttpResponse<AuthenticatedUser> = {
      data: mockAuthenticatedUser(),
      statusCode: HttpStatusCode.OK,
    }
    serviceAuthSpy.mockResolvedValueOnce(response)

    const authDto = mockUserAuthenticationParams()
    await controller.auth(authDto, res)

    expect(res.status).toBeCalledWith(response.statusCode)
    expect(res.send).toBeCalledWith({ data: response.data })
  })
})

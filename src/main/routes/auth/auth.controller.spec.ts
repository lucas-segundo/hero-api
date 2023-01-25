import { Test, TestingModule } from '@nestjs/testing'
import { mockUserAuthenticationParams } from 'domain/use-cases/user-authentication/mock'
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

    const authDto = mockUserAuthenticationParams()
    await controller.auth(authDto)

    expect(serviceAuthSpy).toBeCalledWith(authDto)
  })
})

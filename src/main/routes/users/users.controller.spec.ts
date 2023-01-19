import { Test, TestingModule } from '@nestjs/testing'
import { mockUserCreaterParams } from 'domain/use-cases/user-creater/mock'
import { mockUsersModule } from './factory.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

describe('UsersController', () => {
  let controller: UsersController
  let userService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      mockUsersModule()
    ).compile()

    userService = module.get<UsersService>(UsersService)
    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call create user with right params', async () => {
    const createSpy = jest.spyOn(userService, 'create')

    const params = mockUserCreaterParams()
    await controller.create(params)

    expect(createSpy).toBeCalledWith(params)
  })
})

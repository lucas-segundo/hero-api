import { Test, TestingModule } from '@nestjs/testing'
import { mockUserCreaterParams } from 'domain/use-cases/user-creater/mock'
import { mockUsersModule } from './factory.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { createMock } from '@golevelup/ts-jest'
import { Response } from 'express'
import { HttpResponse, HttpStatusCode } from 'presentation/protocols/http'
import { mockUser } from 'domain/models/user/mock'

const mockResponse = () =>
  createMock<Response>({
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  })

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

    const res = mockResponse()
    const params = mockUserCreaterParams()
    await controller.create(params, res)

    expect(createSpy).toBeCalledWith(params)
  })

  it('should response with right data after creation', async () => {
    const createSpy = jest.spyOn(userService, 'create')
    const result: HttpResponse = {
      data: mockUser(),
      statusCode: HttpStatusCode.CREATED,
    }
    createSpy.mockResolvedValueOnce(result)

    const res = mockResponse()
    const params = mockUserCreaterParams()
    await controller.create(params, res)

    expect(res.status).toBeCalledWith(result.statusCode)
    expect(res.send).toBeCalledWith({ data: result.data })
  })
})

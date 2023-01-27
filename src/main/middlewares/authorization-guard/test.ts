import { AuthorizationGuard } from '.'
import { mockUserAuthMiddleware } from 'presentation/middlewares/user-authorization/mock'
import { ExecutionContext } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest'
import { faker } from '@faker-js/faker'
import { mockHttpErrorResponse } from 'presentation/protocols/http/mock'

describe('AuthorizationGuard', () => {
  it('should call user auth with right params', async () => {
    const userAuthMiddleware = mockUserAuthMiddleware()
    jest.spyOn(userAuthMiddleware, 'handle').mockResolvedValueOnce()

    const sut = new AuthorizationGuard(userAuthMiddleware)

    const token = faker.datatype.uuid()
    const executionContext = createMock<ExecutionContext>()
    executionContext.switchToHttp().getRequest.mockReturnValueOnce({
      headers: {
        authorization: token,
      },
    })

    await sut.canActivate(executionContext)

    expect(userAuthMiddleware.handle).toBeCalledWith({ token })
  })

  it('should return true if request is authorized', async () => {
    const userAuthMiddleware = mockUserAuthMiddleware()
    jest.spyOn(userAuthMiddleware, 'handle').mockResolvedValueOnce()

    const sut = new AuthorizationGuard(userAuthMiddleware)

    const token = faker.datatype.uuid()
    const executionContext = createMock<ExecutionContext>()
    executionContext.switchToHttp().getRequest.mockReturnValueOnce({
      headers: {
        authorization: token,
      },
    })

    const result = await sut.canActivate(executionContext)

    expect(result).toBe(true)
  })

  it('should throw error if request is not authorized', async () => {
    const userAuthMiddleware = mockUserAuthMiddleware()
    jest
      .spyOn(userAuthMiddleware, 'handle')
      .mockResolvedValueOnce(mockHttpErrorResponse())

    const sut = new AuthorizationGuard(userAuthMiddleware)

    const token = faker.datatype.uuid()
    const executionContext = createMock<ExecutionContext>()
    executionContext.switchToHttp().getRequest.mockReturnValueOnce({
      headers: {
        authorization: token,
      },
    })

    const result = sut.canActivate(executionContext)

    await expect(result).rejects.toThrowError()
  })
})

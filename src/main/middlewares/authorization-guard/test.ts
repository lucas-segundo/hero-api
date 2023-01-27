import { AuthorizationGuard } from '.'
import { mockUserAuthMiddleware } from 'presentation/middlewares/user-authorization/mock'
import { ExecutionContext, HttpException } from '@nestjs/common'
import { createMock } from '@golevelup/ts-jest'
import { faker } from '@faker-js/faker'
import { mockHttpErrorResponse } from 'presentation/protocols/http/mock'
import { MissingAuthToken } from 'presentation/errors/missing-auth-token'
import { HttpErrorResponse } from 'presentation/protocols/http'

const makeSut = () => {
  const userAuthMiddleware = mockUserAuthMiddleware()
  const sut = new AuthorizationGuard(userAuthMiddleware)

  return {
    userAuthMiddleware,
    sut,
  }
}

describe('AuthorizationGuard', () => {
  it('should call user auth with right params', async () => {
    const { userAuthMiddleware, sut } = makeSut()
    jest.spyOn(userAuthMiddleware, 'handle').mockResolvedValueOnce()

    const token = faker.datatype.uuid()
    const executionContext = createMock<ExecutionContext>()
    executionContext.switchToHttp().getRequest.mockReturnValueOnce({
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    await sut.canActivate(executionContext)

    expect(userAuthMiddleware.handle).toBeCalledWith({ token })
  })

  it('should return true if request is authorized', async () => {
    const userAuthMiddleware = mockUserAuthMiddleware()
    jest.spyOn(userAuthMiddleware, 'handle').mockResolvedValueOnce()

    const sut = new AuthorizationGuard(userAuthMiddleware)

    const executionContext = createMock<ExecutionContext>()
    executionContext.switchToHttp().getRequest.mockReturnValueOnce({
      headers: {
        authorization: `Bearer ${faker.datatype.uuid()}`,
      },
    })

    const result = await sut.canActivate(executionContext)

    expect(result).toBe(true)
  })

  it('should throw error if request is not authorized', async () => {
    const userAuthMiddleware = mockUserAuthMiddleware()
    const httpErrorResponse = mockHttpErrorResponse()
    jest
      .spyOn(userAuthMiddleware, 'handle')
      .mockResolvedValueOnce(httpErrorResponse)

    const sut = new AuthorizationGuard(userAuthMiddleware)

    const executionContext = createMock<ExecutionContext>()
    executionContext.switchToHttp().getRequest.mockReturnValueOnce({
      headers: {
        authorization: `Bearer ${faker.datatype.uuid()}`,
      },
    })

    const result = sut.canActivate(executionContext)

    await expect(result).rejects.toThrowError(
      new HttpException(httpErrorResponse.errors, httpErrorResponse.statusCode)
    )
  })

  it('should throw error if token is missing', async () => {
    const userAuthMiddleware = mockUserAuthMiddleware()
    jest.spyOn(userAuthMiddleware, 'handle').mockResolvedValueOnce()

    const sut = new AuthorizationGuard(userAuthMiddleware)

    const executionContext = createMock<ExecutionContext>()
    executionContext.switchToHttp().getRequest.mockReturnValueOnce({
      headers: {},
    })

    const result = sut.canActivate(executionContext)

    const missingError = new MissingAuthToken()
    const httpErrorResponse: HttpErrorResponse = {
      errors: [missingError.message],
      statusCode: missingError.statusCode,
    }
    await expect(result).rejects.toThrowError(
      new HttpException(httpErrorResponse, httpErrorResponse.statusCode)
    )
  })
})

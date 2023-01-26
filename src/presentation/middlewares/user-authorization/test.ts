import {
  mockUserAuthorization,
  mockUserAuthorizationParams,
} from 'domain/use-cases/user-authorization/mock'
import { UnauthorizedError } from 'presentation/errors/unauthorized-error'
import { HttpErrorResponse } from 'presentation/protocols/http'
import { UserAuthorizationMiddleware } from '.'

describe('UserAuthorizationMiddleware', () => {
  it('should call user authorization with right params', async () => {
    const userAuthorization = mockUserAuthorization()
    const sut = new UserAuthorizationMiddleware(userAuthorization)

    const params = mockUserAuthorizationParams()
    await sut.handle(params)

    expect(userAuthorization.auth).toBeCalledWith(params)
  })

  it('should respond with error if authorization returns false', async () => {
    const userAuthorization = mockUserAuthorization()
    const sut = new UserAuthorizationMiddleware(userAuthorization)

    userAuthorization.auth.mockResolvedValueOnce(false)

    const params = mockUserAuthorizationParams()
    const response = await sut.handle(params)

    const error = new UnauthorizedError()
    const expectedResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: error.statusCode,
    }
    expect(response).toEqual(expectedResponse)
  })
})

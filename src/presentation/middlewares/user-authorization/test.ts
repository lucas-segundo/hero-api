import {
  mockUserAuthorization,
  mockUserAuthorizationParams,
} from 'domain/use-cases/user-authorization/mock'
import { UserAuthorizationMiddleware } from '.'

describe('UserAuthorizationMiddleware', () => {
  it('should call user authorization with right params', async () => {
    const userAuthorization = mockUserAuthorization()
    const sut = new UserAuthorizationMiddleware(userAuthorization)

    const params = mockUserAuthorizationParams()
    await sut.handle(params)

    expect(userAuthorization.auth).toBeCalledWith(params)
  })
})

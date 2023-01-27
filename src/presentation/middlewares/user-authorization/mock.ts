import { mockUserAuthorization } from 'domain/use-cases/user-authorization/mock'
import { UserAuthorizationMiddleware } from '.'

export const mockUserAuthMiddleware = () => {
  return new UserAuthorizationMiddleware(mockUserAuthorization())
}

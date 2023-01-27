import { LocalUserAuthorization } from 'app/use-cases/local-user-authorization'
import { JwtDencrypter } from 'infra/jwt/dencrypter'
import { UserAuthorizationMiddleware } from 'presentation/middlewares/user-authorization'

export const makeUserAuthorizationMiddleware = () => {
  const dencrypter = new JwtDencrypter()
  const userAuth = new LocalUserAuthorization(dencrypter)

  return new UserAuthorizationMiddleware(userAuth)
}

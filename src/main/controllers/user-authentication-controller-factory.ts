import { makeUserAuthentication } from 'main/use-cases/user-authentication-factory'
import { UserAuthenticationController } from 'presentation/controllers/user-authentication'

export const makeUserAuthenticationController = () => {
  const userAuth = makeUserAuthentication()
  return new UserAuthenticationController(userAuth)
}

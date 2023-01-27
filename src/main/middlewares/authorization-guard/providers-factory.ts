import { Provider } from '@nestjs/common'
import { makeUserAuthorizationMiddleware } from 'main/middlewares/user-authorization'
import { UserAuthorizationMiddleware } from 'presentation/middlewares/user-authorization'

export const makeAuthorizationProviders = (): Provider[] => {
  return [
    {
      provide: UserAuthorizationMiddleware,
      useFactory: () => makeUserAuthorizationMiddleware(),
    },
  ]
}

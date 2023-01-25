import { ModuleMetadata } from '@nestjs/common'
import { makeUserAuthentication } from 'main/use-cases/user-authentication-factory'
import { UserAuthenticationController } from 'presentation/controllers/user-authentication'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

export const makeUserAuthModule = (): ModuleMetadata => ({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UserAuthenticationController,
      useFactory() {
        const userAuth = makeUserAuthentication()
        return new UserAuthenticationController(userAuth)
      },
    },
  ],
})

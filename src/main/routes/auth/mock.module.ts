import { ModuleMetadata } from '@nestjs/common'
import { mockUserAuthentication } from 'domain/use-cases/user-authentication/mock'
import { UserAuthenticationController } from 'presentation/controllers/user-authentication'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

export const mockUserAuthModule = (): ModuleMetadata => ({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UserAuthenticationController,
      useFactory() {
        const userAuth = mockUserAuthentication()
        return new UserAuthenticationController(userAuth)
      },
    },
  ],
})

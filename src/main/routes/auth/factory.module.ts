import { ModuleMetadata } from '@nestjs/common'
import { makeUserAuthenticationController } from 'main/controllers/user-authentication-controller-factory'
import { UserAuthenticationController } from 'presentation/controllers/user-authentication'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

export const makeUserAuthModule = (): ModuleMetadata => ({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: UserAuthenticationController,
      useFactory: () => makeUserAuthenticationController(),
    },
  ],
})

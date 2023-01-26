import { ModuleMetadata, Provider } from '@nestjs/common'
import { makeUserAuthenticationController } from 'main/controllers/user-authentication-controller-factory'
import { UserAuthenticationController } from 'presentation/controllers/user-authentication'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

const customProviders = (): Provider[] => {
  return [
    {
      provide: UserAuthenticationController,
      useFactory: () => makeUserAuthenticationController(),
    },
  ]
}

export const makeUserAuthModule = (): ModuleMetadata => ({
  controllers: [AuthController],
  providers: [AuthService, ...customProviders()],
})

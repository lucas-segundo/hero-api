import { ModuleMetadata } from '@nestjs/common'
import { makeUserCreationController } from 'main/controllers/user-creation-controller-factory'
import { UserCreationController } from 'presentation/controllers/user-creation'
import { makeAuthorizationProviders } from '../../middlewares/authorization-guard/providers-factory'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

export const makeUsersModule = (): ModuleMetadata => ({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserCreationController,
      useFactory: () => makeUserCreationController(),
    },
    ...makeAuthorizationProviders(),
  ],
})

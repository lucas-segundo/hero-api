import { ModuleMetadata, Provider } from '@nestjs/common'
import { makeUserCreationController } from 'main/controllers/user-creation-controller-factory'
import { UserCreationController } from 'presentation/controllers/user-creation'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

const customProviders = (): Provider[] => {
  return [
    {
      provide: UserCreationController,
      useFactory: () => makeUserCreationController(),
    },
  ]
}

export const makeUsersModule = (): ModuleMetadata => ({
  controllers: [UsersController],
  providers: [UsersService, ...customProviders()],
})

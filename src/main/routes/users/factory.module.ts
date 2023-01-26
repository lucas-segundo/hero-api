import { ModuleMetadata } from '@nestjs/common'
import { mockUserCreater } from 'domain/use-cases/user-creater/mock'
import { makeUserCreationController } from 'main/controllers/user-creation-controller-factory'
import { UserCreationController } from 'presentation/controllers/user-creation'
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
  ],
})

export const mockUsersModule = (): ModuleMetadata => ({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserCreationController,
      useFactory() {
        const userCreater = mockUserCreater()
        return new UserCreationController(userCreater)
      },
    },
  ],
})

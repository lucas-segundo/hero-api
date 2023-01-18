import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserCreationController } from 'presentation/controllers/user-creation'
import { makeUserCreater } from 'main/use-cases/user-creater-factory'

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserCreationController,
      useFactory() {
        const userCreater = makeUserCreater()
        return new UserCreationController(userCreater)
      },
    },
  ],
})
export class UsersModule {}

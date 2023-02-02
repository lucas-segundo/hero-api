import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { RacesModule } from './races/races.module'
import { TestModule } from './test/test.module'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    RacesModule,
    TestModule,
  ],
})
export class AppModule {}

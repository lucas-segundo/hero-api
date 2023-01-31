import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { RaceModule } from './race/race.module'
import { RacesModule } from './races/races.module'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    RaceModule,
    RacesModule,
  ],
})
export class AppModule {}

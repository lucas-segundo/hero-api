import { Module } from '@nestjs/common'
import { makeUsersModule } from './factory.module'

@Module(makeUsersModule())
export class UsersModule {}

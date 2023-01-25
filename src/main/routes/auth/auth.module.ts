import { Module } from '@nestjs/common'
import { makeUserAuthModule } from './factory.module'

@Module(makeUserAuthModule())
export class AuthModule {}

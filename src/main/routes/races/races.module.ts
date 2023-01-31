import { Module } from '@nestjs/common'
import { makeRacesModule } from './factory.module'

@Module(makeRacesModule())
export class RacesModule {}

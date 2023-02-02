import { ModuleMetadata } from '@nestjs/common'
import { makeRaceCreationController } from 'main/controllers/race-creation-controller'
import { makeRaceFinderController } from 'main/controllers/race-finder-controller'
import { makeAuthorizationProviders } from 'main/middlewares/authorization-guard/providers-factory'
import { RaceCreationController } from 'presentation/controllers/race-creation'
import { RaceFinderController } from 'presentation/controllers/race-finder'
import { RacesController } from './races.controller'
import { RacesService } from './races.service'

export const makeRacesModule = (): ModuleMetadata => ({
  controllers: [RacesController],
  providers: [
    RacesService,
    {
      provide: RaceCreationController,
      useFactory: () => makeRaceCreationController(),
    },
    {
      provide: RaceFinderController,
      useFactory: () => makeRaceFinderController(),
    },
    ...makeAuthorizationProviders(),
  ],
})

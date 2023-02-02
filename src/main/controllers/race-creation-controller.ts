import { makeRaceCreation } from 'main/use-cases/race-creation-factory'
import { RaceCreationController } from 'presentation/controllers/race-creation'

export const makeRaceCreationController = () => {
  const raceCreation = makeRaceCreation()

  return new RaceCreationController(raceCreation)
}

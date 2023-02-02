import { makeRaceFinder } from 'main/use-cases/race-finder-factory'
import { RaceFinderController } from 'presentation/controllers/race-finder'

export const raceFinderController = () => {
  const raceFinder = makeRaceFinder()
  return new RaceFinderController(raceFinder)
}

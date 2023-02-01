import { Race } from 'domain/models/race'
import { RaceFinder, RaceFinderParams } from 'domain/use-cases/race-finder'

export class RaceFinderController implements RaceFinder {
  constructor(private raceFinder: RaceFinder) {}

  async find(params: RaceFinderParams): Promise<Race> {
    await this.raceFinder.find(params)
    return
  }
}

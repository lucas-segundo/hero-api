import { RaceFinderRepository } from 'app/protocols/race-finder-repository'
import { Race } from 'domain/models/race'
import { RaceFinder, RaceFinderParams } from 'domain/use-cases/race-finder'

export class DbRaceFinder implements RaceFinder {
  constructor(private raceFinderRepository: RaceFinderRepository) {}

  async find(params: RaceFinderParams): Promise<Race> {
    await this.raceFinderRepository.find(params)

    return
  }
}

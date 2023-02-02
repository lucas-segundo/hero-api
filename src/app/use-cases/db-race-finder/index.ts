import { RaceFinderRepository } from 'app/protocols/race-finder-repository'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { Race } from 'domain/models/race'
import { RaceFinder, RaceFinderParams } from 'domain/use-cases/race-finder'

export class DbRaceFinder implements RaceFinder {
  constructor(private raceFinderRepository: RaceFinderRepository) {}

  async find(params: RaceFinderParams): Promise<Race> {
    try {
      const { id, title } = await this.raceFinderRepository.find(params)

      return {
        id: id.toString(),
        title,
      }
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}

import { RaceCreaterRepository } from 'app/protocols/race-creater-repository'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import {
  RaceCreated,
  RaceCreation,
  RaceCreationParams,
} from 'domain/use-cases/race-creation'

export class DbRaceCreation implements RaceCreation {
  constructor(private RaceCreaterRepository: RaceCreaterRepository) {}

  async create(params: RaceCreationParams): Promise<RaceCreated> {
    try {
      const raceCreatedRepo = await this.RaceCreaterRepository.create(params)

      return raceCreatedRepo
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}

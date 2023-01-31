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
      const { id, title } = await this.RaceCreaterRepository.create(params)

      return {
        id: id.toString(),
        title,
      }
    } catch (error) {
      throw new UnexpectedError()
    }
  }
}

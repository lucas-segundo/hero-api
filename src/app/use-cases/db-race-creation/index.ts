import { RaceCreaterRepository } from 'app/protocols/race-creater-repository'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { Race } from 'domain/models/race'
import {
  RaceCreation,
  RaceCreationParams,
} from 'domain/use-cases/race-creation'

export class DbRaceCreation implements RaceCreation {
  constructor(private RaceCreaterRepository: RaceCreaterRepository) {}

  async create(params: RaceCreationParams): Promise<Race> {
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

import { RaceCreationRepository } from 'app/protocols/race-creation-repository'
import {
  RaceCreated,
  RaceCreation,
  RaceCreationParams,
} from 'domain/use-cases/race-creation'

export class DbRaceCreation implements RaceCreation {
  constructor(private raceCreationRepository: RaceCreationRepository) {}

  async create(params: RaceCreationParams): Promise<RaceCreated> {
    await this.raceCreationRepository.create(params)

    return
  }
}

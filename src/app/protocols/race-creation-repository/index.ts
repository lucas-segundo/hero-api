import { RaceCreated, RaceCreationParams } from 'domain/use-cases/race-creation'

export type RaceCreationRepositoryParams = RaceCreationParams

export interface RaceCreationRepository {
  create(params: RaceCreationRepositoryParams): Promise<RaceCreated>
}

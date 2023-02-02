import {
  RaceFinderRepository,
  RaceFinderRepositoryModel,
  RaceFinderRepositoryParams,
} from 'app/protocols/race-finder-repository'
import { Knex } from 'knex'

export class KnexRaceFinderRepository implements RaceFinderRepository {
  constructor(private client: Knex) {}
  async find({
    id,
  }: RaceFinderRepositoryParams): Promise<RaceFinderRepositoryModel> {
    const race: RaceFinderRepositoryModel = await this.client
      .select('*')
      .from('races')
      .where('id', id)
      .first()

    return race
  }
}

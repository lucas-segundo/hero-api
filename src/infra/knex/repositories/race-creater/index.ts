import {
  RaceCreaterRepository,
  RaceCreaterRepositoryModel,
  RaceCreaterRepositoryParams,
} from 'app/protocols/race-creater-repository'
import { Knex } from 'knex'

export class KnexRaceCreaterRepository implements RaceCreaterRepository {
  tableName = 'races'
  constructor(private readonly client: Knex) {}

  async create(
    params: RaceCreaterRepositoryParams
  ): Promise<RaceCreaterRepositoryModel> {
    await this.client.insert(params).into(this.tableName)
    return
  }
}

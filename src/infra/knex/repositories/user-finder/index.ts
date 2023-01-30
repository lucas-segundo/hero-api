import {
  UserFinderRepository,
  UserFinderRepositoryModel,
  UserFinderRepositoryParams,
} from 'app/protocols/user-finder-repository'
import { Knex } from 'knex'

export class KnexUserFinderRepository implements UserFinderRepository {
  constructor(private client: Knex) {}
  async find({
    by,
    value,
  }: UserFinderRepositoryParams): Promise<UserFinderRepositoryModel> {
    const data = await this.client
      .select('*')
      .from<UserFinderRepositoryModel>('users')
      .where(by, value)
      .first()

    return data
  }
}

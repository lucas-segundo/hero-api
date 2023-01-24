import { DbUser } from 'app/models/db-user'
import {
  UserFinderRepository,
  UserFinderRepositoryParams,
} from 'app/protocols/user-finder-repository'
import { Knex } from 'knex'

export class KnexUserFinderRepository implements UserFinderRepository {
  constructor(private client: Knex) {}
  async find({ by, value }: UserFinderRepositoryParams): Promise<DbUser> {
    const data = await this.client
      .select('*')
      .from<DbUser>('users')
      .where(by, value)
      .first()

    return data
  }
}

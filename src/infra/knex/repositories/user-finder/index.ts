import { DbUser } from 'app/models/db-user'
import {
  UserFinderRepository,
  UserFinderRepositoryParams,
} from 'app/protocols/user-finder-repository'
import { Knex } from 'knex'

export class KnexUserFinderRepository implements UserFinderRepository {
  constructor(private client: Knex) {}
  async find({ by, value }: UserFinderRepositoryParams): Promise<DbUser> {
    await this.client.select('*').from('users').where(by, value).first()

    return null
  }
}

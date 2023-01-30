import {
  UserCreationRepository,
  UserCreationRepositoryModel,
  UserCreationRepositoryParams,
} from 'app/protocols/user-creater-repository'
import { Knex } from 'knex'

export class KnexUserCreationRepository implements UserCreationRepository {
  constructor(private readonly client: Knex) {}

  async create(
    params: UserCreationRepositoryParams
  ): Promise<UserCreationRepositoryModel> {
    const result = await this.client.insert(params).into('users')

    return {
      id: result[0].toString(),
    }
  }
}

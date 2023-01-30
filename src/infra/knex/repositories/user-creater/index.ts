import {
  UserCreaterRepository,
  UserCreaterRepositoryModel,
  UserCreaterRepositoryParams,
} from 'app/protocols/user-creater-repository'
import { Knex } from 'knex'

export class KnexUserCreaterRepository implements UserCreaterRepository {
  constructor(private readonly client: Knex) {}

  async create(
    params: UserCreaterRepositoryParams
  ): Promise<UserCreaterRepositoryModel> {
    const result = await this.client.insert(params).into('users')

    return {
      id: result[0].toString(),
    }
  }
}

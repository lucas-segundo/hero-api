import { UserCreaterRepository } from 'core/app/protocols/user-creater-repository'
import { User } from 'core/domain/models/user'
import { UserCreaterParams } from 'core/domain/use-cases/user-creater'
import { Knex } from 'knex'

export class KnexUserCreaterRepository implements UserCreaterRepository {
  constructor(private readonly client: Knex) {}

  async create(params: UserCreaterParams): Promise<User> {
    const result = await this.client.insert(params).into('users')

    return {
      id: result[0].toString(),
      ...params,
    }
  }
}

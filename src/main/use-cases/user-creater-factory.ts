import { DbUserCreater } from 'app/use-cases/db-user-creater'
import { BcryptHasher } from 'infra/bcrypt/hasher'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { KnexUserCreaterRepository } from 'infra/knex/repositories/user-creater'

export const makeUserCreater = () => {
  const repository = new KnexUserCreaterRepository(KnexDbHandler.client)
  const hasher = new BcryptHasher()

  return new DbUserCreater(repository, hasher)
}

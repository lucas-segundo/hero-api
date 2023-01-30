import { DbUserCreation } from 'app/use-cases/db-user-creation'
import { BcryptHasher } from 'infra/bcrypt/hasher'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { KnexUserCreationRepository } from 'infra/knex/repositories/user-creater'

export const makeUserCreation = () => {
  const repository = new KnexUserCreationRepository(KnexDbHandler.client)
  const hasher = new BcryptHasher()

  return new DbUserCreation(repository, hasher)
}

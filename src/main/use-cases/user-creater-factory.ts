import { DbUserCreater } from 'app/use-cases/db-user-creater'
import { BcryptEncrypter } from 'infra/bcrypt'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { KnexUserCreaterRepository } from 'infra/knex/repositories/user-creater'

export const makeUserCreater = () => {
  const repository = new KnexUserCreaterRepository(KnexDbHandler.client)
  const encrypter = new BcryptEncrypter()

  return new DbUserCreater(repository, encrypter)
}

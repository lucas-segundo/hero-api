import { DbUserCreater } from 'core/app/use-cases/db-user-creater'
import { BcryptEncrypter } from 'core/infra/bcrypt'
import dbKnexClient from 'core/infra/knex/config/db-client'
import { KnexUserCreaterRepository } from 'core/infra/knex/repositories/user-creater'

export const makeUserCreater = () => {
  const repository = new KnexUserCreaterRepository(dbKnexClient)
  const encrypter = new BcryptEncrypter()

  return new DbUserCreater(repository, encrypter)
}

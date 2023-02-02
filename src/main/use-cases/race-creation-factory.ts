import { DbRaceCreation } from 'app/use-cases/db-race-creation'
import { KnexDbHandler } from 'infra/knex/config/knex-db-handler'
import { KnexRaceCreaterRepository } from 'infra/knex/repositories/race-creater'

export const makeRaceCreation = () => {
  const repo = new KnexRaceCreaterRepository(KnexDbHandler.client)
  const raceCreation = new DbRaceCreation(repo)

  return raceCreation
}

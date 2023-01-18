import knex, { Knex } from 'knex'
import { knexEnvs } from '../envs'

let dbKnexClient: Knex
if (process.env.NODE_ENV === 'test') {
  dbKnexClient = knex(knexEnvs.test)
} else {
  dbKnexClient = knex(knexEnvs.dev)
}

export default dbKnexClient

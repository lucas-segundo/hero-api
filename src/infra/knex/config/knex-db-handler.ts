import knex, { Knex } from 'knex'
import { knexEnvs } from '../envs'
import * as knexStringcase from 'knex-stringcase'

export const KnexDbHandler = {
  client: null as Knex,

  async connect(env: keyof typeof knexEnvs) {
    const options = knexStringcase(knexEnvs[env])
    this.client = knex(options)
  },

  async migrateLatest() {
    await this.client.migrate.latest()
  },

  async disconnect() {
    await this.client.destroy()
    this.client = null
  },
}

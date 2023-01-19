import knex, { Knex } from 'knex'
import { knexEnvs } from '../envs'

export const KnexDbHandler = {
  client: null as Knex,

  async connect(env: keyof typeof knexEnvs) {
    this.client = knex(knexEnvs[env])
  },

  async migrateLatest() {
    await this.client.migrate.latest()
  },

  async disconnect() {
    await this.client.destroy()
    this.client = null
  },
}

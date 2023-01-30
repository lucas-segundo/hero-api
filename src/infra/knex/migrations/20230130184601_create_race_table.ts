import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('races')

  if (!hasTable) {
    return knex.schema.createTableIfNotExists('races', (table) => {
      table.increments('id').primary()
      table.string('title')
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('races')
}

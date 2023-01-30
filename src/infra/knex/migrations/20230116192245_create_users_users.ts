import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('users')

  if (!hasTable) {
    return knex.schema.createTableIfNotExists('users', (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('email')
      table.string('password_hashed')
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users')
}

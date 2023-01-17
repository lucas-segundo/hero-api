import * as path from 'path'

const migrationsFolder = path.join(__dirname, 'migrations')

export const knexEnvs = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrationsFolder,
    },
  },
  dev: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: migrationsFolder,
    },
  },
}

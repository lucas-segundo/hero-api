import { KnownError } from 'domain/errors/known-error'

export class DataNotFoundError extends KnownError {
  constructor(name: string) {
    super(`${name} not found in database.`)
  }
}

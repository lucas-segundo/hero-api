import { KnownError } from 'domain/errors/known-error'

export class WrongPasswordError extends KnownError {
  constructor() {
    super('User password is wrong.')
  }
}

import { KnownError } from 'domain/errors/known-error'
import { HttpStatusCode } from 'presentation/protocols/http'

export class MissingAuthToken extends KnownError {
  statusCode = HttpStatusCode.UNAUTHORIZED
  constructor() {
    super('Missing authorization token.')
  }
}

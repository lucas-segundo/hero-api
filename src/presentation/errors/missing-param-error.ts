import { HttpStatusCode } from 'presentation/protocols/http'

export class MissingParamError extends Error {
  statusCode = HttpStatusCode.BAD_REQUEST
  constructor(paramName: string) {
    super(`Missing ${paramName} param`)
  }
}

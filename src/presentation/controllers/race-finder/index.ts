import { Race } from 'domain/models/race'
import { RaceFinder, RaceFinderParams } from 'domain/use-cases/race-finder'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import { Controller } from 'presentation/protocols/controller'
import {
  HttpResponse,
  HttpErrorResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'

export class RaceFinderController implements Controller {
  constructor(private raceFinder: RaceFinder) {}
  async handle(
    params: RaceFinderParams
  ): Promise<HttpResponse<Race> | HttpErrorResponse> {
    const errors = []
    if (!params.id) {
      errors.push(new MissingParamError('id').message)
    }

    if (errors.length) {
      return {
        errors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    const data = await this.raceFinder.find(params)

    return {
      data,
      statusCode: HttpStatusCode.CREATED,
    }
  }
}

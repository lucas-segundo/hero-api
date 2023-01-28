import {
  RaceCreated,
  RaceCreation,
  RaceCreationParams,
} from 'domain/use-cases/race-creation'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import { Controller } from 'presentation/protocols/controller'
import {
  HttpResponse,
  HttpErrorResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'

export class RaceCreationController implements Controller {
  constructor(private raceCreation: RaceCreation) {}
  async handle(
    params: RaceCreationParams
  ): Promise<HttpResponse<RaceCreated> | HttpErrorResponse> {
    const errors = []
    !params.title && errors.push(new MissingParamError('title'))

    if (errors.length) {
      return {
        errors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    const userCreated = await this.raceCreation.create(params)

    return {
      data: userCreated,
      statusCode: HttpStatusCode.OK,
    }
  }
}

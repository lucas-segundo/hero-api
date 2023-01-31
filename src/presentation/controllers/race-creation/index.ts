import { KnownError } from 'domain/errors/known-error'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { Race } from 'domain/models/race'
import {
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
  ): Promise<HttpResponse<Race> | HttpErrorResponse> {
    const errors = []
    !params.title && errors.push(new MissingParamError('title').message)

    if (errors.length) {
      return {
        errors,
        statusCode: HttpStatusCode.BAD_REQUEST,
      }
    }

    try {
      const userCreated = await this.raceCreation.create(params)

      return {
        data: userCreated,
        statusCode: HttpStatusCode.CREATED,
      }
    } catch (error) {
      if (error instanceof KnownError) {
        return {
          errors: [error.message],
          statusCode: HttpStatusCode.SERVER_ERROR,
        }
      }

      return {
        errors: [new UnexpectedError().message],
        statusCode: HttpStatusCode.SERVER_ERROR,
      }
    }
  }
}

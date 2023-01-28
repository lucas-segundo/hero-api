import {
  RaceCreated,
  RaceCreation,
  RaceCreationParams,
} from 'domain/use-cases/race-creation'
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
    const userCreated = await this.raceCreation.create(params)

    return {
      data: userCreated,
      statusCode: HttpStatusCode.OK,
    }
  }
}

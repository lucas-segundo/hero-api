import { Race } from 'domain/models/race'
import { RaceFinder, RaceFinderParams } from 'domain/use-cases/race-finder'
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
    const data = await this.raceFinder.find(params)

    return {
      data,
      statusCode: HttpStatusCode.CREATED,
    }
  }
}

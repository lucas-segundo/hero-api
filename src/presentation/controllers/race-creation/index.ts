import {
  RaceCreation,
  RaceCreationParams,
} from 'domain/use-cases/race-creation'
import { Controller } from 'presentation/protocols/controller'
import { HttpResponse, HttpErrorResponse } from 'presentation/protocols/http'

export class RaceCreationController implements Controller {
  constructor(private raceCreation: RaceCreation) {}
  async handle(
    params: RaceCreationParams
  ): Promise<HttpResponse<any> | HttpErrorResponse> {
    await this.raceCreation.create(params)

    return
  }
}

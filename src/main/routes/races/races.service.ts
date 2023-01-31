import { Injectable } from '@nestjs/common'
import { RaceCreationController } from 'presentation/controllers/race-creation'
import { CreateRaceDto } from './dto/create-race.dto'

@Injectable()
export class RacesService {
  constructor(private raceCreationController: RaceCreationController) {}
  async create(createRaceDto: CreateRaceDto) {
    return await this.raceCreationController.handle(createRaceDto)
  }
}

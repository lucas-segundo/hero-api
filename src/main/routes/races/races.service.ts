import { Injectable } from '@nestjs/common'
import { RaceCreationController } from 'presentation/controllers/race-creation'
import { RaceFinderController } from 'presentation/controllers/race-finder'
import { CreateRaceDto } from './dto/create-race.dto'

@Injectable()
export class RacesService {
  constructor(
    private raceCreationController: RaceCreationController,
    private raceFinderController: RaceFinderController
  ) {}
  async create(createRaceDto: CreateRaceDto) {
    return await this.raceCreationController.handle(createRaceDto)
  }

  async findOne(id: string) {
    return await this.raceFinderController.handle({ id: id.toString() })
  }
}

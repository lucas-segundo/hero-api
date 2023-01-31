import { Controller, Post, Body } from '@nestjs/common'
import { RacesService } from './races.service'
import { CreateRaceDto } from './dto/create-race.dto'

@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Post()
  create(@Body() createRaceDto: CreateRaceDto) {
    return this.racesService.create(createRaceDto)
  }
}

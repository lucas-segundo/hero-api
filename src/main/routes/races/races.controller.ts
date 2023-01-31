import { Controller, Post, Body, Res } from '@nestjs/common'
import { RacesService } from './races.service'
import { CreateRaceDto } from './dto/create-race.dto'
import { handleResponse } from 'main/helpers/handle-response'

@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Post()
  async create(@Body() createRaceDto: CreateRaceDto, @Res() res) {
    const result = await this.racesService.create(createRaceDto)

    handleResponse(res, result)
  }
}

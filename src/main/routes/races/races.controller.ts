import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common'
import { RacesService } from './races.service'
import { CreateRaceDto } from './dto/create-race.dto'
import { handleResponse } from 'main/helpers/handle-response'
import { AuthorizationGuard } from 'main/middlewares/authorization-guard'

@Controller('races')
@UseGuards(AuthorizationGuard)
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  @Post()
  async create(@Body() createRaceDto: CreateRaceDto, @Res() res) {
    const result = await this.racesService.create(createRaceDto)

    handleResponse(res, result)
  }
}

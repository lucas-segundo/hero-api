import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Response } from 'express'
import { handleResponse } from 'main/helpers/handle-response'
import { AuthorizationGuard } from 'main/middlewares/authorization-guard'

@Controller('users')
@UseGuards(AuthorizationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const result = await this.usersService.create(createUserDto)

    handleResponse(res, result)
  }
}

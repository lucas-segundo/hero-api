import { Controller, Post, Body, Res } from '@nestjs/common'
import { Response } from 'express'
import { handleResponse } from 'main/helpers/handle-response'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async auth(@Body() authDto: AuthDto, @Res() res: Response) {
    const result = await this.authService.auth(authDto)

    handleResponse(res, result)
  }
}

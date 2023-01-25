import { Injectable } from '@nestjs/common'
import { UserAuthenticationController } from 'presentation/controllers/user-authentication'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private userAuthenticationController: UserAuthenticationController
  ) {}
  async auth(authDto: AuthDto) {
    return await this.userAuthenticationController.handle(authDto)
  }
}

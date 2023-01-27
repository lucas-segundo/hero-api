import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common'
import { Request } from 'express'
import { UserAuthorizationMiddleware } from 'presentation/middlewares/user-authorization'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private userAuthorizationMiddleware: UserAuthorizationMiddleware
  ) {}

  async canActivate(context: ExecutionContext) {
    const token = context.switchToHttp().getRequest<Request>()
      .headers.authorization

    const error = await this.userAuthorizationMiddleware.handle({ token })

    if (error) {
      throw new HttpException(error, error.statusCode)
    }

    return true
  }
}

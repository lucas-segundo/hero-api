import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common'
import { Request } from 'express'
import { MissingAuthToken } from 'presentation/errors/missing-auth-token'
import { UserAuthorizationMiddleware } from 'presentation/middlewares/user-authorization'
import { HttpErrorResponse } from 'presentation/protocols/http'

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private userAuthorizationMiddleware: UserAuthorizationMiddleware
  ) {}

  async canActivate(context: ExecutionContext) {
    const bearerToken = context.switchToHttp().getRequest<Request>()
      .headers.authorization

    if (!bearerToken) {
      const error = new MissingAuthToken()
      const httpErrorResponse: HttpErrorResponse = {
        errors: [error.message],
        statusCode: error.statusCode,
      }

      throw new HttpException(httpErrorResponse, httpErrorResponse.statusCode)
    }

    const [, token] = bearerToken.split(' ')

    const error = await this.userAuthorizationMiddleware.handle({ token })

    if (error) {
      throw new HttpException(error, error.statusCode)
    }

    return true
  }
}

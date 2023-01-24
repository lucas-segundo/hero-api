import { faker } from '@faker-js/faker'
import { UserAuthenticationParams } from 'domain/use-cases/user-authentication'
import { mockUserAuthentication } from 'domain/use-cases/user-authentication/mock'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import { HttpErrorResponse, HttpStatusCode } from 'presentation/protocols/http'
import { UserAuthenticationController } from '.'

describe('UserAuthenticationController', () => {
  it('should call user authentication with right params', async () => {
    const userAuthentication = mockUserAuthentication()
    const sut = new UserAuthenticationController(userAuthentication)

    const params: UserAuthenticationParams = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    await sut.handle(params)

    expect(userAuthentication.auth).toBeCalledWith(params)
  })

  it('should return errors if request is missing the required data', async () => {
    const userAuthentication = mockUserAuthentication()
    const sut = new UserAuthenticationController(userAuthentication)

    const params: UserAuthenticationParams = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    delete params.password
    const response = await sut.handle(params)

    const expectedResponse: HttpErrorResponse = {
      errors: [new MissingParamError('password').message],
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(response).toEqual(expectedResponse)
  })
})

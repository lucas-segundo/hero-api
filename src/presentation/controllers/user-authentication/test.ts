import { faker } from '@faker-js/faker'
import { UserAuthenticationParams } from 'domain/use-cases/user-authentication'
import {
  mockAuthenticatedUser,
  mockUserAuthentication,
} from 'domain/use-cases/user-authentication/mock'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'
import { UserAuthenticationController } from '.'

const makeSut = () => {
  const userAuthentication = mockUserAuthentication()
  const sut = new UserAuthenticationController(userAuthentication)

  return {
    sut,
    userAuthentication,
  }
}

describe('UserAuthenticationController', () => {
  it('should call user authentication with right params', async () => {
    const { sut, userAuthentication } = makeSut()

    const params: UserAuthenticationParams = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    await sut.handle(params)

    expect(userAuthentication.auth).toBeCalledWith(params)
  })

  it('should return errors if request is missing the required data', async () => {
    const { sut } = makeSut()

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

  it('should respond with user authenticated', async () => {
    const { sut, userAuthentication } = makeSut()

    const authenticatedUser = mockAuthenticatedUser()
    userAuthentication.auth.mockResolvedValueOnce(authenticatedUser)

    const params: UserAuthenticationParams = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    const response = await sut.handle(params)

    const expectedResponse: HttpResponse = {
      data: {
        ...authenticatedUser,
      },
      statusCode: HttpStatusCode.OK,
    }
    expect(response).toEqual(expectedResponse)
  })
})

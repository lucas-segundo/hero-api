import { faker } from '@faker-js/faker'
import { KnownError } from 'domain/errors/known-error'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { User } from 'domain/models/user'
import { UserCreationParams } from 'domain/use-cases/user-creation'
import { mockUserCreation } from 'domain/use-cases/user-creation/mock'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'
import { UserCreationController } from '.'

const makeSut = () => {
  const UserCreation = mockUserCreation()
  const sut = new UserCreationController(UserCreation)

  const params: UserCreationParams = {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    password: faker.internet.password(),
  }

  return {
    UserCreation,
    sut,
    params,
  }
}

describe('UserCreationController', () => {
  it('should create a user with right params', async () => {
    const { sut, UserCreation, params } = makeSut()

    await sut.handle(params)

    expect(UserCreation.create).toBeCalledWith(params)
  })

  it('should return user data after creation', async () => {
    const { sut, params, UserCreation } = makeSut()

    const user: User = {
      id: faker.datatype.uuid(),
      name: params.name,
      email: params.email,
    }
    UserCreation.create.mockResolvedValueOnce(user)

    const response = await sut.handle(params)

    const userCopy = { ...user }
    const httpResponse: HttpResponse = {
      data: userCopy,
      statusCode: HttpStatusCode.CREATED,
    }

    expect(response).toEqual(httpResponse)
  })

  it('should return errors if request is missing the required data', async () => {
    const { sut, params } = makeSut()
    params.email = undefined
    const response = await sut.handle(params)
    const expectedResponse: HttpErrorResponse = {
      errors: [new MissingParamError('email').message],
      statusCode: HttpStatusCode.BAD_REQUEST,
    }

    expect(response).toEqual(expectedResponse)
  })

  it('should handle known error', async () => {
    const { sut, params, UserCreation } = makeSut()

    const error = new KnownError(faker.random.words())
    UserCreation.create.mockRejectedValueOnce(error)

    const response = await sut.handle(params)
    const expectedResponse: HttpErrorResponse = {
      errors: [error.message],
      statusCode: HttpStatusCode.SERVER_ERROR,
    }

    expect(response).toEqual(expectedResponse)
  })

  it('should handle error when something wrong happens', async () => {
    const { sut, params, UserCreation } = makeSut()

    UserCreation.create.mockRejectedValueOnce(new Error())

    const response = await sut.handle(params)
    const expectedResponse: HttpErrorResponse = {
      errors: [new UnexpectedError().message],
      statusCode: HttpStatusCode.SERVER_ERROR,
    }

    expect(response).toEqual(expectedResponse)
  })
})

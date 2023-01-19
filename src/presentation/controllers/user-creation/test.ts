import { faker } from '@faker-js/faker'
import { UnexpectedError } from 'app/errors/unexpected-error'
import { User } from 'domain/models/user'
import { UserCreaterParams } from 'domain/use-cases/user-creater'
import { mockUserCreater } from 'domain/use-cases/user-creater/mock'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from 'presentation/protocols/http'
import { UserCreationController } from '.'

const makeSut = () => {
  const userCreater = mockUserCreater()
  const sut = new UserCreationController(userCreater)

  const params: UserCreaterParams = {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    password: faker.internet.password(),
  }

  return {
    userCreater,
    sut,
    params,
  }
}

describe('UserCreationController', () => {
  it('should create a user with right params', async () => {
    const { sut, userCreater, params } = makeSut()

    await sut.handle(params)

    expect(userCreater.create).toBeCalledWith(params)
  })

  it('should return user data after creation', async () => {
    const { sut, params, userCreater } = makeSut()

    const user: User = {
      id: faker.datatype.uuid(),
      name: params.name,
      email: params.email,
      passwordHashed: params.password,
    }
    userCreater.create.mockResolvedValueOnce(user)

    const response = await sut.handle(params)

    const httpResponse: HttpResponse = {
      data: user,
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

  it('should handle error when something wrong happens', async () => {
    const { sut, params, userCreater } = makeSut()

    userCreater.create.mockRejectedValueOnce(new Error())

    const response = await sut.handle(params)
    const expectedResponse: HttpErrorResponse = {
      errors: [new UnexpectedError().message],
      statusCode: HttpStatusCode.SERVER_ERROR,
    }

    expect(response).toEqual(expectedResponse)
  })
})

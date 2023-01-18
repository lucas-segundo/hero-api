import { faker } from '@faker-js/faker'
import { User } from 'domain/models/user'
import { UserCreaterParams } from 'domain/use-cases/user-creater'
import { mockUserCreater } from 'domain/use-cases/user-creater/mock'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import { HttpErrorResponse, HttpResponse } from 'presentation/protocols/http'
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

  it('should return errors if request is missing the required data', async () => {
    const { sut, params } = makeSut()
    params.email = undefined
    const response = await sut.handle(params)
    const expectedResponse: HttpErrorResponse = {
      errors: [new MissingParamError('email')],
      statusCode: 403,
    }

    expect(response).toEqual(expectedResponse)
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
      statusCode: 200,
    }

    expect(response).toEqual(httpResponse)
  })
})

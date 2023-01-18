import { faker } from '@faker-js/faker'
import { UserCreaterParams } from 'domain/use-cases/user-creater'
import { mockUserCreater } from 'domain/use-cases/user-creater/mock'
import { MissingParamError } from 'presentation/errors/missing-param-error'
import { HttpErrorResponse, HttpResponse } from 'presentation/protocols/http'
import { UserCreation } from '.'

const makeSut = () => {
  const userCreater = mockUserCreater()
  const sut = new UserCreation(userCreater)

  const requestData: UserCreaterParams = {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    password: faker.internet.password(),
  }

  return {
    userCreater,
    sut,
    requestData,
  }
}

describe('UserCreation', () => {
  it('should create a user with right params', async () => {
    const { sut, userCreater, requestData } = makeSut()

    await sut.handle(requestData)

    expect(userCreater.create).toBeCalledWith(requestData)
  })

  it('should return errors if request is missing the required data', async () => {
    const { sut, requestData } = makeSut()
    requestData.email = undefined
    const response = await sut.handle(requestData)
    const expectedResponse: HttpErrorResponse = {
      errors: [new MissingParamError('email')],
      statusCode: 403,
    }

    expect(response).toEqual(expectedResponse)
  })
})

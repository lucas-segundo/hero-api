import { faker } from '@faker-js/faker'
import { mockUserCreaterRepository } from 'core/app/protocols/user-creater-repository/mock'
import { User } from 'core/domain/models/user'
import { UserCreaterParams } from 'core/domain/use-cases/user-creater'
import { mockUserCreaterParams } from 'core/domain/use-cases/user-creater/mock'
import { DbUserCreater } from '.'

const makeSut = () => {
  const userCreaterRepository = mockUserCreaterRepository()
  const sut = new DbUserCreater(userCreaterRepository)
  const params: UserCreaterParams = mockUserCreaterParams()

  return {
    sut,
    params,
    userCreaterRepository,
  }
}

describe('DbUserCreater', () => {
  it('should call user creater repository with right params', async () => {
    const { sut, params, userCreaterRepository } = makeSut()

    await sut.create(params)

    expect(userCreaterRepository.create).toBeCalledWith(params)
  })

  it('should return the user data after creation', async () => {
    const { sut, params, userCreaterRepository } = makeSut()

    const userCreated: User = {
      id: faker.datatype.uuid(),
      ...params,
    }
    userCreaterRepository.create.mockResolvedValueOnce(userCreated)

    const modelData = await sut.create(params)

    expect(modelData).toEqual(userCreated)
  })
})

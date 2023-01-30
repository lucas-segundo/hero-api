import { faker } from '@faker-js/faker'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { HasherParams } from 'app/protocols/hasher'
import { mockHasher } from 'app/protocols/hasher/mock'
import { UserCreaterRepositoryParams } from 'app/protocols/user-creater-repository'
import {
  mockUserCreaterRepository,
  mockUserCreaterRepositoryModel,
} from 'app/protocols/user-creater-repository/mock'
import { User } from 'domain/models/user'
import { UserCreaterParams } from 'domain/use-cases/user-creater'
import { mockUserCreaterParams } from 'domain/use-cases/user-creater/mock'
import { DbUserCreater } from '.'

const makeSut = () => {
  const userCreaterRepository = mockUserCreaterRepository()
  const hasher = mockHasher()
  const sut = new DbUserCreater(userCreaterRepository, hasher)
  const params: UserCreaterParams = mockUserCreaterParams()

  return {
    sut,
    params,
    userCreaterRepository,
    hasher,
  }
}

describe('DbUserCreater', () => {
  it('should call hasher with right params', async () => {
    const { sut, params, hasher, userCreaterRepository } = makeSut()
    userCreaterRepository.create.mockResolvedValueOnce(
      mockUserCreaterRepositoryModel()
    )

    await sut.create(params)

    const hasherParams: HasherParams = {
      value: params.password,
    }
    expect(hasher.hash).toBeCalledWith(hasherParams)
  })

  it('should call user creater repository with right params', async () => {
    const { sut, params, userCreaterRepository, hasher } = makeSut()
    userCreaterRepository.create.mockResolvedValueOnce(
      mockUserCreaterRepositoryModel()
    )

    const passwordHashed = faker.datatype.uuid()
    hasher.hash.mockResolvedValueOnce(passwordHashed)

    await sut.create(params)

    const userRepoParams: UserCreaterRepositoryParams = {
      email: params.email,
      name: params.name,
      passwordHashed: passwordHashed,
    }
    expect(userCreaterRepository.create).toBeCalledWith(userRepoParams)
  })

  it('should return the user data after creation', async () => {
    const { sut, params, userCreaterRepository, hasher } = makeSut()

    const passwordHashed = faker.datatype.uuid()
    hasher.hash.mockResolvedValueOnce(passwordHashed)

    const userCreated: User = {
      id: faker.datatype.uuid(),
      email: params.email,
      name: params.name,
    }
    userCreaterRepository.create.mockResolvedValueOnce(userCreated)

    const modelData = await sut.create(params)

    expect(modelData).toEqual(userCreated)
  })

  it('should handle error if user creater repository throws', async () => {
    const { sut, params, userCreaterRepository } = makeSut()
    userCreaterRepository.create.mockRejectedValueOnce(new Error())

    const modelData = sut.create(params)

    await expect(modelData).rejects.toThrowError(UnexpectedError)
  })

  it('should handle error if hasher throws', async () => {
    const { sut, params, hasher } = makeSut()
    hasher.hash.mockRejectedValueOnce(new Error())

    const modelData = sut.create(params)

    await expect(modelData).rejects.toThrowError(UnexpectedError)
  })
})

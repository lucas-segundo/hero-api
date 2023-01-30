import { faker } from '@faker-js/faker'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { HasherParams } from 'app/protocols/hasher'
import { mockHasher } from 'app/protocols/hasher/mock'
import { UserCreationRepositoryParams } from 'app/protocols/user-creater-repository'
import {
  mockUserCreationRepository,
  mockUserCreationRepositoryModel,
} from 'app/protocols/user-creater-repository/mock'
import { User } from 'domain/models/user'
import { UserCreationParams } from 'domain/use-cases/user-creation'
import { mockUserCreationParams } from 'domain/use-cases/user-creation/mock'
import { DbUserCreation } from '.'

const makeSut = () => {
  const UserCreationRepository = mockUserCreationRepository()
  const hasher = mockHasher()
  const sut = new DbUserCreation(UserCreationRepository, hasher)
  const params: UserCreationParams = mockUserCreationParams()

  return {
    sut,
    params,
    UserCreationRepository,
    hasher,
  }
}

describe('DbUserCreation', () => {
  it('should call hasher with right params', async () => {
    const { sut, params, hasher, UserCreationRepository } = makeSut()
    UserCreationRepository.create.mockResolvedValueOnce(
      mockUserCreationRepositoryModel()
    )

    await sut.create(params)

    const hasherParams: HasherParams = {
      value: params.password,
    }
    expect(hasher.hash).toBeCalledWith(hasherParams)
  })

  it('should call user creater repository with right params', async () => {
    const { sut, params, UserCreationRepository, hasher } = makeSut()
    UserCreationRepository.create.mockResolvedValueOnce(
      mockUserCreationRepositoryModel()
    )

    const passwordHashed = faker.datatype.uuid()
    hasher.hash.mockResolvedValueOnce(passwordHashed)

    await sut.create(params)

    const userRepoParams: UserCreationRepositoryParams = {
      email: params.email,
      name: params.name,
      passwordHashed: passwordHashed,
    }
    expect(UserCreationRepository.create).toBeCalledWith(userRepoParams)
  })

  it('should return the user data after creation', async () => {
    const { sut, params, UserCreationRepository, hasher } = makeSut()

    const passwordHashed = faker.datatype.uuid()
    hasher.hash.mockResolvedValueOnce(passwordHashed)

    const userCreated: User = {
      id: faker.datatype.uuid(),
      email: params.email,
      name: params.name,
    }
    UserCreationRepository.create.mockResolvedValueOnce(userCreated)

    const modelData = await sut.create(params)

    expect(modelData).toEqual(userCreated)
  })

  it('should handle error if user creater repository throws', async () => {
    const { sut, params, UserCreationRepository } = makeSut()
    UserCreationRepository.create.mockRejectedValueOnce(new Error())

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

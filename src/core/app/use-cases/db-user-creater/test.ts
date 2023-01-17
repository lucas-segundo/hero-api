import { faker } from '@faker-js/faker'
import { UnexpectedError } from 'core/app/errors/unexpected-error'
import { EncrypterParams } from 'core/app/protocols/encrypter'
import { mockEncrypter } from 'core/app/protocols/encrypter/mock'
import { UserCreaterRepositoryParams } from 'core/app/protocols/user-creater-repository'
import { mockUserCreaterRepository } from 'core/app/protocols/user-creater-repository/mock'
import { User } from 'core/domain/models/user'
import { UserCreaterParams } from 'core/domain/use-cases/user-creater'
import { mockUserCreaterParams } from 'core/domain/use-cases/user-creater/mock'
import { DbUserCreater } from '.'

const makeSut = () => {
  const userCreaterRepository = mockUserCreaterRepository()
  const encrypter = mockEncrypter()
  const sut = new DbUserCreater(userCreaterRepository, encrypter)
  const params: UserCreaterParams = mockUserCreaterParams()

  return {
    sut,
    params,
    userCreaterRepository,
    encrypter,
  }
}

describe('DbUserCreater', () => {
  it('should call encrypter with right params', async () => {
    const { sut, params, encrypter } = makeSut()

    await sut.create(params)

    const encrypterParams: EncrypterParams = {
      value: params.password,
    }
    expect(encrypter.encrypt).toBeCalledWith(encrypterParams)
  })

  it('should call user creater repository with right params', async () => {
    const { sut, params, userCreaterRepository, encrypter } = makeSut()
    const passwordHashed = faker.datatype.uuid()
    encrypter.encrypt.mockResolvedValueOnce(passwordHashed)

    await sut.create(params)

    const userRepoParams: UserCreaterRepositoryParams = {
      email: params.email,
      name: params.name,
      passwordHashed: passwordHashed,
    }
    expect(userCreaterRepository.create).toBeCalledWith(userRepoParams)
  })

  it('should return the user data after creation', async () => {
    const { sut, params, userCreaterRepository, encrypter } = makeSut()

    const passwordHashed = faker.datatype.uuid()
    encrypter.encrypt.mockResolvedValueOnce(passwordHashed)

    const userCreated: User = {
      id: faker.datatype.uuid(),
      email: params.email,
      name: params.name,
      passwordHashed: passwordHashed,
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

  it('should handle error if encrypter throws', async () => {
    const { sut, params, encrypter } = makeSut()
    encrypter.encrypt.mockRejectedValueOnce(new Error())

    const modelData = sut.create(params)

    await expect(modelData).rejects.toThrowError(UnexpectedError)
  })
})

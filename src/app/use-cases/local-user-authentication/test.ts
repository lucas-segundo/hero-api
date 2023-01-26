import { faker } from '@faker-js/faker'
import { DataNotFoundError } from 'app/errors/data-not-found-error'
import { UnexpectedError } from 'domain/errors/unexpected-error'
import { mockDbUser } from 'app/models/db-user/mock'
import { EncrypterParams } from 'app/protocols/encrypter'
import { mockEncrypter } from 'app/protocols/encrypter/mock'
import { HashComparerParams } from 'app/protocols/hash-comparer'
import { mockHashComparer } from 'app/protocols/hash-comparer/mock'
import { UserFinderRepositoryParams } from 'app/protocols/user-finder-repository'
import { mockUserFinderRepository } from 'app/protocols/user-finder-repository/mock'
import { AuthenticatedUser } from 'domain/use-cases/user-authentication'
import { mockUserAuthenticationParams } from 'domain/use-cases/user-authentication/mock'
import { LocalUserAuthentication } from '.'
import { WrongPasswordError } from 'app/errors/wrong-password-error'
import { User } from 'domain/models/user'

const makeSut = () => {
  const userFinderRepository = mockUserFinderRepository()
  const hashComparer = mockHashComparer()
  const encrypter = mockEncrypter()
  const sut = new LocalUserAuthentication(
    userFinderRepository,
    hashComparer,
    encrypter
  )

  const dbUser = mockDbUser()

  const resolveDependencies = () => {
    userFinderRepository.find.mockResolvedValueOnce(dbUser)
    hashComparer.compare.mockResolvedValueOnce(true)
  }

  return {
    sut,
    userFinderRepository,
    hashComparer,
    encrypter,
    resolveDependencies,
    dbUser,
  }
}

describe('LocalUserAuthentication', () => {
  it('should call dbUser finder with right params', async () => {
    const { sut, userFinderRepository, resolveDependencies } = makeSut()

    resolveDependencies()

    const params = mockUserAuthenticationParams()
    await sut.auth(params)

    const expectedParams: UserFinderRepositoryParams = {
      by: 'email',
      value: params.email,
    }
    expect(userFinderRepository.find).toBeCalledWith(expectedParams)
  })

  it('should throw error if dbUser doesnt exist', async () => {
    const { sut, userFinderRepository } = makeSut()
    userFinderRepository.find.mockResolvedValueOnce(undefined)

    const params = mockUserAuthenticationParams()
    const result = sut.auth(params)

    await expect(result).rejects.toThrowError(new DataNotFoundError('User'))
  })

  it('should call hash comparer with right params', async () => {
    const { sut, resolveDependencies, hashComparer, dbUser } = makeSut()

    resolveDependencies()

    const params = mockUserAuthenticationParams()
    await sut.auth(params)

    const compareParams: HashComparerParams = {
      hashedValue: dbUser.passwordHashed,
      value: params.password,
    }
    expect(hashComparer.compare).toBeCalledWith(compareParams)
  })

  it('should throw error if hash comparer return false', async () => {
    const { sut, userFinderRepository, hashComparer } = makeSut()

    userFinderRepository.find.mockResolvedValueOnce(mockDbUser())
    hashComparer.compare.mockResolvedValueOnce(false)

    const params = mockUserAuthenticationParams()
    const result = sut.auth(params)

    await expect(result).rejects.toThrowError(new WrongPasswordError())
  })

  it('should call encrypter with right params', async () => {
    const { sut, encrypter, resolveDependencies, dbUser } = makeSut()

    resolveDependencies()

    await sut.auth(mockUserAuthenticationParams())

    const { id } = dbUser
    const encrypterParams: EncrypterParams = {
      payload: {
        id,
      },
    }

    expect(encrypter.encrypt).toBeCalledWith(encrypterParams)
  })

  it('should return authenticated dbUser', async () => {
    const { sut, encrypter, resolveDependencies, dbUser } = makeSut()

    const token = faker.datatype.uuid()
    encrypter.encrypt.mockResolvedValueOnce(token)
    resolveDependencies()

    const { id, email, name } = dbUser
    const aduthenticatedUser = await sut.auth({
      email,
      password: faker.internet.password(),
    })

    const user: User = {
      id,
      email,
      name,
    }
    const expectedAduthenticatedUser: AuthenticatedUser = {
      token,
      user,
    }

    expect(aduthenticatedUser).toEqual(expectedAduthenticatedUser)
  })

  it('should throw unexpected error if encrypter throws', async () => {
    const { sut, encrypter, resolveDependencies } = makeSut()

    encrypter.encrypt.mockRejectedValueOnce(new Error())
    resolveDependencies()

    const result = sut.auth(mockUserAuthenticationParams())

    await expect(result).rejects.toThrowError(new UnexpectedError())
  })
})

import { DataNotFoundError } from 'app/errors/data-not-found-error'
import { WrongPasswordError } from 'app/errors/wrong-password-error'
import { mockDbUser } from 'app/models/db-user/mock'
import { EncrypterParams } from 'app/protocols/encrypter'
import { mockEncrypter } from 'app/protocols/encrypter/mock'
import { HashComparerParams } from 'app/protocols/hash-comparer'
import { mockHashComparer } from 'app/protocols/hash-comparer/mock'
import { UserFinderRepositoryParams } from 'app/protocols/user-finder-repository'
import { mockUserFinderRepository } from 'app/protocols/user-finder-repository/mock'
import { mockUserAuthenticationParams } from 'domain/use-cases/user-authentication/mock'
import { DbUserAuthentication } from '.'

const makeSut = () => {
  const userFinderRepository = mockUserFinderRepository()
  const hashComparer = mockHashComparer()
  const encrypter = mockEncrypter()
  const sut = new DbUserAuthentication(
    userFinderRepository,
    hashComparer,
    encrypter
  )

  const user = mockDbUser()

  const resolveDependencies = (userMocked = user) => {
    userFinderRepository.find.mockResolvedValueOnce(userMocked)
    hashComparer.compare.mockResolvedValueOnce(true)
  }

  return {
    sut,
    userFinderRepository,
    hashComparer,
    encrypter,
    resolveDependencies,
    user,
  }
}

describe('DbUserAuthentication', () => {
  it('should call user finder with right params', async () => {
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

  it('should throw error if user doesnt exist', async () => {
    const { sut, userFinderRepository } = makeSut()
    userFinderRepository.find.mockResolvedValueOnce(undefined)

    const params = mockUserAuthenticationParams()
    const result = sut.auth(params)

    await expect(result).rejects.toThrowError(new DataNotFoundError('User'))
  })

  it('should call hash comparer with right params', async () => {
    const { sut, resolveDependencies, hashComparer, user } = makeSut()

    resolveDependencies(user)

    const params = mockUserAuthenticationParams()
    await sut.auth(params)

    const compareParams: HashComparerParams = {
      hashedValue: user.passwordHashed,
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
    const { sut, encrypter, resolveDependencies, user } = makeSut()

    resolveDependencies()

    await sut.auth(mockUserAuthenticationParams())

    const { id } = user
    const encrypterParams: EncrypterParams = {
      payload: {
        id,
      },
    }

    expect(encrypter.encrypt).toBeCalledWith(encrypterParams)
  })
})

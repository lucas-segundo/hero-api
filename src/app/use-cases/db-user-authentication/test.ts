import { DataNotFoundError } from 'app/errors/data-not-found-error'
import { WrongPasswordError } from 'app/errors/wrong-password-error'
import { HashComparerParams } from 'app/protocols/hash-comparer'
import { mockHashComparer } from 'app/protocols/hash-comparer/mock'
import { UserFinderRepositoryParams } from 'app/protocols/user-finder-repository'
import { mockUserFinderRepository } from 'app/protocols/user-finder-repository/mock'
import { mockUser } from 'domain/models/user/mock'
import { mockUserAuthenticationParams } from 'domain/use-cases/user-authentication/mock'
import { DbUserAuthentication } from '.'

const makeSut = () => {
  const userFinderRepository = mockUserFinderRepository()
  const hashComparer = mockHashComparer()
  const sut = new DbUserAuthentication(userFinderRepository, hashComparer)

  return {
    sut,
    userFinderRepository,
    hashComparer,
  }
}

describe('DbUserAuthentication', () => {
  it('should call user finder with right params', async () => {
    const { sut, userFinderRepository, hashComparer } = makeSut()

    userFinderRepository.find.mockResolvedValueOnce(mockUser())
    hashComparer.compare.mockResolvedValueOnce(true)

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
    const { sut, userFinderRepository, hashComparer } = makeSut()
    const user = mockUser()

    userFinderRepository.find.mockResolvedValueOnce(user)
    hashComparer.compare.mockResolvedValueOnce(true)

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
    const user = mockUser()

    userFinderRepository.find.mockResolvedValueOnce(user)
    hashComparer.compare.mockResolvedValueOnce(false)

    const params = mockUserAuthenticationParams()
    const result = sut.auth(params)

    await expect(result).rejects.toThrowError(new WrongPasswordError())
  })
})

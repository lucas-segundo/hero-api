import { UserFinderRepositoryParams } from 'app/protocols/user-finder-repository'
import { mockUserFinderRepository } from 'app/protocols/user-finder-repository/mock'
import { mockUserAuthenticationParams } from 'domain/use-cases/user-authentication/mock'
import { DbUserAuthentication } from '.'

describe('DbUserAuthentication', () => {
  it('should call user finder with right params', async () => {
    const userFinderRepository = mockUserFinderRepository()
    const sut = new DbUserAuthentication(userFinderRepository)

    const params = mockUserAuthenticationParams()
    await sut.auth(params)

    const expectedParams: UserFinderRepositoryParams = {
      by: 'email',
      value: params.email,
    }
    expect(userFinderRepository.find).toBeCalledWith(expectedParams)
  })
})

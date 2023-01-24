import { faker } from '@faker-js/faker'
import { UserAuthenticationParams } from 'domain/use-cases/user-authentication'
import { mockUserAuthentication } from 'domain/use-cases/user-authentication/mock'
import { UserAuthenticationController } from '.'

describe('UserAuthenticationController', () => {
  it('should call user authentication with right params', async () => {
    const userAuthentication = mockUserAuthentication()
    const sut = new UserAuthenticationController(userAuthentication)

    const params: UserAuthenticationParams = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    await sut.handle(params)

    expect(userAuthentication.auth).toBeCalledWith(params)
  })
})

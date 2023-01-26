import { mockDencrypter } from 'app/protocols/dencrypter/mock'
import { mockUserAuthorizationParams } from 'domain/use-cases/user-authorization/mock'
import { LocalUserAuthorization } from '.'

describe('LocalUserAuthorization', () => {
  it('should call dencrypter with right params', async () => {
    const dencrypter = mockDencrypter()
    const sut = new LocalUserAuthorization(dencrypter)

    const params = mockUserAuthorizationParams()
    await sut.auth(params)

    expect(dencrypter.dencrypt).toBeCalledWith(params)
  })
})

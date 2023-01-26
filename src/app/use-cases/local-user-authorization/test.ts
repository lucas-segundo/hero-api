import { mockTokenPayload } from 'app/models/token-payload/mock'
import { mockDencrypter } from 'app/protocols/dencrypter/mock'
import { mockUserAuthorizationParams } from 'domain/use-cases/user-authorization/mock'
import { LocalUserAuthorization } from '.'

const makeSut = () => {
  const dencrypter = mockDencrypter()
  const sut = new LocalUserAuthorization(dencrypter)

  return {
    sut,
    dencrypter,
  }
}

describe('LocalUserAuthorization', () => {
  it('should call dencrypter with right params', async () => {
    const { sut, dencrypter } = makeSut()

    const params = mockUserAuthorizationParams()
    await sut.auth(params)

    expect(dencrypter.dencrypt).toBeCalledWith(params)
  })

  it('should return true if user is authorized', async () => {
    const { sut, dencrypter } = makeSut()
    dencrypter.dencrypt.mockResolvedValueOnce(mockTokenPayload())

    const params = mockUserAuthorizationParams()
    const result = await sut.auth(params)

    expect(result).toBe(true)
  })

  it('should return false if dencrypter throws error', async () => {
    const { sut, dencrypter } = makeSut()
    dencrypter.dencrypt.mockRejectedValueOnce(new Error())

    const params = mockUserAuthorizationParams()
    const result = await sut.auth(params)

    expect(result).toBe(false)
  })
})

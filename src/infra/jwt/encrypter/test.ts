import { faker } from '@faker-js/faker'
import { JwtEncrypter } from '.'
import * as jwt from 'jsonwebtoken'
import { mockEncrypterParams } from 'app/protocols/encrypter/mock'

const makeSut = () => {
  const sut = new JwtEncrypter()
  const signSpy = jest.spyOn(jwt, 'sign')

  return {
    sut,
    signSpy,
  }
}

describe('JwtEncrypter', () => {
  process.env.JWT_SECRET = faker.random.word()

  it('should call jwt with right params', async () => {
    const { sut, signSpy } = makeSut()

    const params = mockEncrypterParams()

    await sut.encrypt(params)

    const options: jwt.SignOptions = {
      expiresIn: 60 * 60,
    }
    expect(signSpy).toBeCalledWith(
      params.payload,
      process.env.JWT_SECRET,
      options
    )
  })

  it('should return jwt token', async () => {
    const { sut, signSpy } = makeSut()

    const expectedToken = faker.datatype.uuid()
    signSpy.mockImplementationOnce(() => expectedToken)
    const params = mockEncrypterParams()

    const token = await sut.encrypt(params)

    expect(token).toBe(expectedToken)
  })
})

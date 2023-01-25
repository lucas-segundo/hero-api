import { faker } from '@faker-js/faker'
import { JwtEncrypter } from '.'
import * as jwt from 'jsonwebtoken'
import { mockEncrypterParams } from 'app/protocols/encrypter/mock'

describe('JwtEncrypter', () => {
  process.env.JWT_SECRET = faker.random.word()

  it('should call jwt with right params', async () => {
    const sut = new JwtEncrypter()

    const signSpy = jest.spyOn(jwt, 'sign')
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
})

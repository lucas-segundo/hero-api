import { faker } from '@faker-js/faker'
import { DencrypterParams } from 'app/protocols/dencrypter'
import { JwtDencrypter } from '.'
import * as jwt from 'jsonwebtoken'

describe('JwtDencrypter', () => {
  const secret = faker.datatype.uuid()
  process.env.JWT_SECRET = secret

  it('should call jwt with right params', async () => {
    const sut = new JwtDencrypter()
    const verifySpy = jest.spyOn(jwt, 'verify')
    verifySpy.mockReturnValueOnce()

    const params: DencrypterParams = {
      token: faker.datatype.uuid(),
    }
    await sut.dencrypt(params)

    expect(verifySpy).toBeCalledWith(params.token, secret)
  })
})

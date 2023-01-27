import { faker } from '@faker-js/faker'
import { DencrypterParams } from 'app/protocols/dencrypter'
import { JwtDencrypter } from '.'
import * as jwt from 'jsonwebtoken'

const makeSut = () => {
  const sut = new JwtDencrypter()
  const verifySpy = jest.spyOn(jwt, 'verify')

  return {
    sut,
    verifySpy,
  }
}

describe('JwtDencrypter', () => {
  const secret = faker.datatype.uuid()
  process.env.JWT_SECRET = secret

  it('should call jwt with right params', async () => {
    const { sut, verifySpy } = makeSut()
    verifySpy.mockReturnValueOnce()

    const params: DencrypterParams = {
      token: faker.datatype.uuid(),
    }
    await sut.dencrypt(params)

    expect(verifySpy).toBeCalledWith(params.token, secret)
  })

  it('should return token decrypted', async () => {
    const { sut, verifySpy } = makeSut()

    const tokenDecrypted = {
      [faker.database.column()]: faker.random.word(),
    }
    verifySpy.mockImplementationOnce(() => tokenDecrypted)

    const params: DencrypterParams = {
      token: faker.datatype.uuid(),
    }
    const data = await sut.dencrypt(params)

    expect(data).toEqual(tokenDecrypted)
  })
})

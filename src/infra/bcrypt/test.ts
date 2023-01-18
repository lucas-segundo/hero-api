import { BcryptEncrypter } from '.'
import * as bcrypt from 'bcrypt'
import { EncrypterParams } from 'app/protocols/encrypter'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const hashSpy = jest.spyOn(bcrypt, 'hash')
  const sut = new BcryptEncrypter()

  return {
    hashSpy,
    sut,
  }
}

describe('BcryptEncrypter', () => {
  it('should call bcrypt hash with right params', async () => {
    const { sut, hashSpy } = makeSut()

    const params: EncrypterParams = {
      value: faker.internet.password(),
    }
    await sut.encrypt(params)

    expect(hashSpy).toBeCalledWith(params.value, 10)
  })

  it('should return a string hashed', async () => {
    const { sut, hashSpy } = makeSut()

    const expectedHash = faker.datatype.uuid()
    hashSpy.mockImplementationOnce(() => Promise.resolve(expectedHash))

    const params: EncrypterParams = {
      value: faker.internet.password(),
    }
    const hash = await sut.encrypt(params)

    expect(hash).toBe(expectedHash)
  })
})

import { BcryptEncrypter } from '.'
import * as bcrypt from 'bcrypt'
import { EncrypterParams } from 'core/app/protocols/encrypter'
import { faker } from '@faker-js/faker'

describe('BcryptEncrypter', () => {
  it('should call bcrypt hash with right params', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const sut = new BcryptEncrypter()

    const params: EncrypterParams = {
      value: faker.internet.password(),
    }
    await sut.encrypt(params)

    expect(hashSpy).toBeCalledWith(params.value, 10)
  })
})

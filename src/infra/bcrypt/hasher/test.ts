import { BcryptHasher } from '.'
import * as bcrypt from 'bcrypt'
import { HasherParams } from 'app/protocols/hasher'
import { faker } from '@faker-js/faker'

const makeSut = () => {
  const hashSpy = jest.spyOn(bcrypt, 'hash')
  const sut = new BcryptHasher()

  return {
    hashSpy,
    sut,
  }
}

describe('BcryptHasher', () => {
  it('should call bcrypt hash with right params', async () => {
    const { sut, hashSpy } = makeSut()

    const params: HasherParams = {
      value: faker.internet.password(),
    }
    await sut.hash(params)

    expect(hashSpy).toBeCalledWith(params.value, 10)
  })

  it('should return a string hashed', async () => {
    const { sut, hashSpy } = makeSut()

    const expectedHash = faker.datatype.uuid()
    hashSpy.mockImplementationOnce(() => Promise.resolve(expectedHash))

    const params: HasherParams = {
      value: faker.internet.password(),
    }
    const hash = await sut.hash(params)

    expect(hash).toBe(expectedHash)
  })
})

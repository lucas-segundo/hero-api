import { BcryptHashComparer } from '.'
import * as bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'
import { HashComparerParams } from 'app/protocols/hash-comparer'
import { mockHashComparerParams } from 'app/protocols/hash-comparer/mock'

const makeSut = () => {
  const hashSpy = jest.spyOn(bcrypt, 'compare')
  const sut = new BcryptHashComparer()
  const params: HashComparerParams = mockHashComparerParams()

  return {
    hashSpy,
    sut,
    params,
  }
}

describe('BcryptHashComparer', () => {
  it('should call bcrypt hash with right params', async () => {
    const { sut, hashSpy, params } = makeSut()

    await sut.compare(params)

    expect(hashSpy).toBeCalledWith(params.value, params.hashedValue)
  })

  it('should return boolean', async () => {
    const { sut, hashSpy, params } = makeSut()

    const expectedResult = faker.datatype.boolean()
    hashSpy.mockImplementationOnce(() => Promise.resolve(expectedResult))

    const hash = await sut.compare(params)

    expect(hash).toBe(expectedResult)
  })
})

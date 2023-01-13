import { faker } from '@faker-js/faker'
import { UserCreaterParams } from 'core/domain/use-cases/user-creater'
import { mockUserCreater } from 'core/domain/use-cases/user-creater/mock'
import { UserCreation } from '.'

describe('UserCreation', () => {
  it('should create a user with right params', async () => {
    const userCreater = mockUserCreater()
    const sut = new UserCreation(userCreater)

    const requestData: UserCreaterParams = {
      email: faker.internet.email(),
      name: faker.name.fullName(),
      password: faker.internet.password(),
    }

    await sut.handle(requestData)

    expect(userCreater.create).toBeCalledWith(requestData)
  })
})

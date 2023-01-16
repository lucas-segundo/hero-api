import { mockUserCreaterRepository } from 'core/app/protocols/user-creater-repository/mock'
import { UserCreaterParams } from 'core/domain/use-cases/user-creater'
import { mockUserCreaterParams } from 'core/domain/use-cases/user-creater/mock'
import { DbUserCreater } from '.'

describe('DbUserCreater', () => {
  it('should call user creater repository with right params', async () => {
    const userCreaterRepository = mockUserCreaterRepository()
    const sut = new DbUserCreater(userCreaterRepository)

    const params: UserCreaterParams = mockUserCreaterParams()
    await sut.create(params)

    expect(userCreaterRepository.create).toBeCalledWith(params)
  })
})

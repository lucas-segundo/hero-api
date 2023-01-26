import { makeUserCreater } from 'main/use-cases/user-creater-factory'
import { UserCreationController } from 'presentation/controllers/user-creation'

export const makeUserCreationController = () => {
  const userCreater = makeUserCreater()

  return new UserCreationController(userCreater)
}

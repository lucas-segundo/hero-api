import { makeUserCreation } from 'main/use-cases/user-creater-factory'
import { UserCreationController } from 'presentation/controllers/user-creation'

export const makeUserCreationController = () => {
  const UserCreation = makeUserCreation()

  return new UserCreationController(UserCreation)
}

import { Injectable } from '@nestjs/common'
import { UserCreationController } from 'presentation/controllers/user-creation'
import { CreateUserDto } from './dto/create-user.dto'
//import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private userCreationController: UserCreationController) {}

  create(createUserDto: CreateUserDto) {
    return this.userCreationController.handle(createUserDto)
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`
  // }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}

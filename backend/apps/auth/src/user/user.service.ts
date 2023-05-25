import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import * as argon2 from 'argon2';

import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  filterUser(user: User) {
    const { pwdHash, ...filteredUsers } = user;
    return filteredUsers;
  }

  async findAllWithoutPassword() {
    const users = await User.find();
    return users.map((user) => this.filterUser(user));
  }

  findOneWithPassword(findBy: Pick<FindOptionsWhere<User>, 'email' | 'id'>) {
    return User.findOneBy(findBy);
  }

  async findOneById(id: string) {
    return await User.findOne({ where: { id } });
  }

  async findOneWithoutPassword(id: string) {
    const user = await this.findOneById(id);
    if (user === null) throw new NotFoundException();
    return this.filterUser(user);
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const hashedPassword = await argon2.hash(updatePasswordDto.password);

    await User.update({ id: userId }, { pwdHash: hashedPassword });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await User.update({ id }, { ...updateUserDto });
    const updateUser = await User.findOne({ where: { id } });
    return this.filterUser(updateUser);
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await argon2.hash(createUserDto.password);

    const foundUser = await User.findOneBy({
      email: createUserDto.email,
    });

    if (foundUser) {
      throw new ConflictException('User with given email already exists');
    }
    const { password, ...createUserDtoWithoutPassword } = createUserDto;

    const createdUser = User.create({
      ...createUserDtoWithoutPassword,
      pwdHash: hashedPassword,
    });

    await createdUser.save();

    const { pwdHash, ...userWithoutPassword } = createdUser;

    return userWithoutPassword;
  }

  async delete(id: string) {
    const { affected } = await User.delete({
      id,
    });
    if (affected === 0) {
      throw new NotFoundException('Not found auction');
    }
  }
}

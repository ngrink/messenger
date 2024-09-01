import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { CreateOAuthUserDto, CreateUserDto, UpdateProfileDto } from './dto';
import { UsersRepository } from './users.repository';
import { UsersException } from './users.exceptions';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDto) {
    // check if user not exists
    const userDB = await this.usersRepository.getUserByEmail(data.email)
    if (userDB) {
      throw UsersException.UserEmailExists();
    }

    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)
    data.password = hashedPassword

    // save user to DB
    const user = this.usersRepository.createUser(data)

    return user;
  }

  async createUserByProvider(data: CreateOAuthUserDto) {
    // check if user not exists
    const userDB = await this.usersRepository.getUserByProvider(data.provider, data.providerSub)
    if (userDB) {
      throw UsersException.UserExists();
    }

    // check if email is not used
    const userEmailDB = await this.usersRepository.getUserByEmail(data.email)
    if (userEmailDB) {
      delete data.email
    }

    // save user to DB
    const user = this.usersRepository.createUserByProvider(data)

    return user;
  }

  async getAllUsers() {
    const users = this.usersRepository.getAllUsers()

    return users;
  }

  async getUser(userId: number) {
    const user = this.usersRepository.getUser(userId)
    if (!user) {
      throw UsersException.UserNotFound();
    }

    return user;
  }

  async getUserByLogin(login: string) {
    const user = this.usersRepository.getUserByLogin(login)
    if (!user) {
      throw UsersException.UserNotFound();
    }

    return user;
  }

  async getUserByProvider(provider: string, providerSub: string) {
    const user = this.usersRepository.getUserByProvider(provider, providerSub)
    if (!user) {
      throw UsersException.UserNotFound();
    }

    return user;
  }

  async updateProfile(userId: number, data: UpdateProfileDto) {
    const profile = await this.usersRepository.updateProfile(userId, data)
    if (!profile) {
      throw UsersException.UserNotFound();
    }

    return profile;
  }

  async updateUsername(userId: number, username: string) {
    const user = await this.usersRepository.getUserByUsername(username)
    if (user) {
      throw UsersException.UsernameExists();
    }

    await this.usersRepository.updateUsername(userId, username)

    return
  }
}

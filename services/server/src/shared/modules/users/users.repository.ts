import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/config/prisma.config";

import { UpdateProfileDto } from "./dto/update-profile.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        profile: {
          create: {
            name: data.name,
          }
        }
      },
      include: {
        profile: true
      }
    })

    delete user.password;

    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        profile: true
      }
    })

    users.map(user => {
      delete user.password;
      return user;
    })

    return users
  }

  async getUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        profile: true
      }
    })
    if (!user) {
      return null
    }

    delete user.password;

    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    })

    return user;
  }

  async getUserByLogin(login: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: login },
          { username: login },
        ]
      },
    })

    return user;
  }


  async updateProfile(userId: number, data: UpdateProfileDto) {
    const profile = await this.prisma.profile.update({
      where: {
        userId: userId
      },
      data: {
        name: data.name,
        avatar: data.avatar,
        birthdate: data.birthdate,
        biography: data.biography
      }
    })

    return profile
  }

  async updateUsername(userId: number, username: string) {
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        username: username,
      }
    })

    return
  }
}
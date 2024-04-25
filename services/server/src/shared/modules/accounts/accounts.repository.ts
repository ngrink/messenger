import { Injectable } from "@nestjs/common";

import { PrismaService } from "src/config/prisma.config";

import { UpdateProfileDto } from "./dto/update-profile.dto";
import { CreateAccountDto } from "./dto/create-account.dto";

@Injectable()
export class AccountsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(data: CreateAccountDto) {
    const account = await this.prisma.account.create({
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

    delete account.password;

    return account;
  }

  async getAllAccounts() {
    const accounts = await this.prisma.account.findMany({
      include: {
        profile: true
      }
    })

    accounts.map(account => {
      delete account.password;
      return account;
    })

    return accounts
  }

  async getAccount(accountId: number) {
    const account = await this.prisma.account.findUnique({
      where: {
        id: accountId
      },
      include: {
        profile: true
      }
    })
    if (!account) {
      return null
    }

    delete account.password;

    return account
  }

  async getAccountByEmail(email: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        email: email,
      },
    })

    return account;
  }

  async updateProfile(accountId: number, data: UpdateProfileDto) {
    const profile = await this.prisma.profile.update({
      where: {
        accountId: accountId
      },
      data: {
        name: data.name,
        avatar: data.avatar,
        birthdate: data.birthdate,
        description: data.description
      }
    })

    return profile
  }
}
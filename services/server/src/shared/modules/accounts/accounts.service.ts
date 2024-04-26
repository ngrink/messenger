import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { AccountsRepository } from './accounts.repository';
import { AccountsException } from './accounts.exceptions';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/config/prisma.config';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async createAccount(data: CreateAccountDto) {
    // check if account not exists
    const accountDB = await this.accountsRepository.getAccountByEmail(data.email)
    if (accountDB) {
      throw AccountsException.AccountEmailExists();
    }

    // hash password
    const hashedPassword = await bcrypt.hash(data.password, 12)
    data.password = hashedPassword

    // save account to DB
    const account = this.accountsRepository.createAccount(data)

    return account;
  }

  async getAllAccounts() {
    const accounts = this.accountsRepository.getAllAccounts()

    return accounts;
  }

  async getAccount(accountId: number) {
    const account = this.accountsRepository.getAccount(accountId)
    if (!account) {
      throw AccountsException.AccountNotFound();
    }

    return account;
  }

  async getAccountByLogin(login: string) {
    const account = this.accountsRepository.getAccountByLogin(login)
    if (!account) {
      throw AccountsException.AccountNotFound();
    }

    return account;
  }

  async updateProfile(accountId: number, data: UpdateProfileDto) {
    const profile = await this.accountsRepository.updateProfile(accountId, data)
    if (!profile) {
      throw AccountsException.AccountNotFound();
    }

    return profile;
  }
}

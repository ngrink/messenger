import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import * as bcrypt from 'bcryptjs'

import { AccountsService } from '../accounts';
import { TokensService } from '../tokens';
import { AuthException } from './auth.exceptions';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly tokensService: TokensService,
  ) {}

  async login(account: Account) {
    const tokens = await this.generateTokens(account)
    
    return tokens
  }

  async loginByCredentials(data: LoginDto) {
    const account = await this.accountsService.getAccountByLogin(data.login).catch(() => null)
    if (!account) {
      throw AuthException.BadCredentials()
    }

    const isMatches = await bcrypt.compare(data.password, account.password)
    if (!isMatches) {
      throw AuthException.BadCredentials()
    }

    const tokens = await this.generateTokens(account)

    return tokens
  }

  async logout() {
    return "logout";
  }

  async refresh(refreshToken: string) {
    const token = this.tokensService.verifyRefreshToken(refreshToken) as RefreshTokenDto
    if (!token) {
      throw AuthException.Unauthorized()
    }

    const account = await this.accountsService.getAccount(Number(token.id))
    const tokens = await this.generateTokens(account) 

    return tokens
  }

  private async generateTokens(account: Account) {
    const accessToken = this.tokensService.generateAccessToken({
      id: account.id,
      email: account.email,
      username: account.username,
    })

    const refreshToken = this.tokensService.generateRefreshToken({
      id: account.id,
      email: account.email,
      username: account.username,
    })

    return { accessToken, refreshToken }
  }
}

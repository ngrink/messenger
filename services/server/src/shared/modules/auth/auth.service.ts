import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs'

import { UsersService } from '../users';
import { TokensService } from '../tokens';
import { AuthException } from './auth.exceptions';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
  ) {}

  async login(user: User) {
    const tokens = await this.generateTokens(user)
    
    return tokens
  }

  async loginByCredentials(data: LoginDto) {
    const user = await this.usersService.getUserByLogin(data.login).catch(() => null)
    if (!user) {
      throw AuthException.BadCredentials()
    }

    const isMatches = await bcrypt.compare(data.password, user.password)
    if (!isMatches) {
      throw AuthException.BadCredentials()
    }

    const tokens = await this.generateTokens(user)

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

    const user = await this.usersService.getUser(token.id)
    const tokens = await this.generateTokens(user) 

    return tokens
  }

  private async generateTokens(user: User) {
    const accessToken = this.tokensService.generateAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    const refreshToken = this.tokensService.generateRefreshToken({
      id: user.id,
      email: user.email,
      username: user.username,
    })

    return { accessToken, refreshToken }
  }
}

import { Controller, Get, Post, Body, Patch, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  /**
    Create a new account
  */ 
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAccount(@Body() data: CreateAccountDto) {
    await this.accountsService.createAccount(data);

    return "OK";
  }

  /**
    Get all accounts
  */
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllAccounts() {
    return this.accountsService.getAllAccounts();
  }

  /**
    Get account by ID
  */
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getAccount(@Param('id') id: number) {
    return this.accountsService.getAccount(id);
  }

  /**
    Update a account profile
  */
  @HttpCode(HttpStatus.OK)
  @Patch(':id/profile')
  updateAccountProfile(@Param('id') id: number, @Body() data: UpdateProfileDto) {
    return this.accountsService.updateProfile(id, data);
  }
}

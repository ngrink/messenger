import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
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
  @Post()
  createAccount(@Body() data: CreateAccountDto) {
    return this.accountsService.createAccount(data);
  }

  /**
    Get all accounts
  */
  @Get()
  getAllAccounts() {
    return this.accountsService.getAllAccounts();
  }

  /**
    Get account by ID
  */
  @Get(':id')
  getAccount(@Param('id') id: number) {
    return this.accountsService.getAccount(id);
  }

  /**
    Update a account profile
  */
  @Patch(':id/profile')
  updateAccountProfile(@Param('id') id: number, @Body() data: UpdateProfileDto) {
    return this.accountsService.updateProfile(id, data);
  }
}

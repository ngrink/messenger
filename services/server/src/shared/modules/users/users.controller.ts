import { Controller, Get, Post, Body, Patch, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateUsernameDto } from './dto/update-username.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
    Create a new user
  */ 
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    await this.usersService.createUser(data);

    return "OK";
  }

  /**
    Get all users
  */
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  /**
    Get user by ID
  */
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }

  /**
    Update a user profile
  */
  @HttpCode(HttpStatus.OK)
  @Patch(':id/profile')
  updateUserProfile(@Param('id') id: number, @Body() data: UpdateProfileDto) {
    return this.usersService.updateProfile(id, data);
  }

  /**
    Update username
  */
  @HttpCode(HttpStatus.OK)
  @Patch(':id/username')
  async updateUsername(@Param('id') id: number, @Body() data: UpdateUsernameDto) {
    await this.usersService.updateUsername(id, data.username);

    return "OK"
  }
}

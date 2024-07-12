import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { Authenticated, CurrentUser } from '@/shared/modules/auth';
import { AccessTokenDto } from '@/shared/modules/auth/dto/tokens.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @Authenticated()
  search(
    @CurrentUser() user: AccessTokenDto,
    @Query('query') query: string,
  ) {
    return this.searchService.search(user.id, query);
  }
}

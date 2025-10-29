import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('blogs')
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.posts.findAll(category);
  }

  @Post()
  create(@Body() body: any) {
    return this.posts.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.posts.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.posts.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.posts.remove(id);
  }
}

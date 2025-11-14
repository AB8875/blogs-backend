import {
  Body,
  UseGuards,
  Req,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Put,
  HttpException,
  HttpStatus,
  ForbiddenException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  async findAll() {
    try {
      const users = await this.users.findAll();
      return { items: users };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(@Body() body: any) {
    try {
      if (!body.name || !body.email || !body.password || !body.role) {
        throw new HttpException(
          'Missing required user fields',
          HttpStatus.BAD_REQUEST,
        );
      }
      return await this.users.create(body);
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate email error from MongoDB
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        error.message || 'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.users.findOne(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'User not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ) {
    // allow if user is admin or updating own profile
    const requester = req.user as any;
    if (requester.role !== 'admin' && requester.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return await this.users.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.users.remove(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

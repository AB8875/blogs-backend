import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('menus')
  @UseGuards(JwtAuthGuard)
  createMenu(@Body() body) {
    return this.menuService.createMenu(body);
  }

  @Get('menus')
  getAllMenus() {
    return this.menuService.getAllMenus();
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard)
  getAllWithSubmenus() {
    return this.menuService.getAllWithSubmenus();
  }

  @Put('menus/:id')
  @UseGuards(JwtAuthGuard)
  updateMenu(@Param('id') id: string, @Body() body) {
    return this.menuService.updateMenu(id, body);
  }

  @Delete('menus/:id')
  @UseGuards(JwtAuthGuard)
  deleteMenu(@Param('id') id: string) {
    return this.menuService.deleteMenu(id);
  }

  @Post('submenus')
  @UseGuards(JwtAuthGuard)
  createSubmenu(@Body() body) {
    return this.menuService.createSubmenu(body);
  }

  @Delete('submenus/:id')
  @UseGuards(JwtAuthGuard)
  deleteSubmenu(@Param('id') id: string) {
    return this.menuService.deleteSubmenu(id);
  }
}

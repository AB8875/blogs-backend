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
import { MenuService } from './menu.service';
import { Menu } from './menu.schema';
import { Submenu } from './submenu.schema';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Menu endpoints
  @Get('menus')
  findAllMenus() {
    return this.menuService.findAllMenus();
  }

  @Get('menus/:id')
  findMenuById(@Param('id') id: string) {
    return this.menuService.findMenuById(id);
  }

  @Post('menus')
  createMenu(@Body() body: Partial<Menu> & { submenus?: Partial<Submenu>[] }) {
    return this.menuService.createMenu(body);
  }

  @Put('menus/:id')
  updateMenu(
    @Param('id') id: string,
    @Body() body: Partial<Menu> & { submenus?: Partial<Submenu>[] },
  ) {
    return this.menuService.updateMenu(id, body);
  }

  @Delete('menus/:id')
  removeMenu(@Param('id') id: string) {
    return this.menuService.removeMenu(id);
  }

  // Submenu endpoints
  @Get('submenus')
  findAllSubmenus(@Query('parent_id') parentId?: string) {
    if (parentId) {
      return this.menuService.findSubmenusByParentId(parentId);
    }
    return this.menuService.findAllSubmenus();
  }

  @Get('submenus/:id')
  findSubmenuById(@Param('id') id: string) {
    return this.menuService.findSubmenuById(id);
  }

  @Post('submenus')
  createSubmenu(@Body() body: Partial<Submenu>) {
    return this.menuService.createSubmenu(body);
  }

  @Put('submenus/:id')
  updateSubmenu(@Param('id') id: string, @Body() body: Partial<Submenu>) {
    return this.menuService.updateSubmenu(id, body);
  }

  @Delete('submenus/:id')
  removeSubmenu(@Param('id') id: string) {
    return this.menuService.removeSubmenu(id);
  }

  // Combined endpoints for admin frontend
  @Get('admin/all')
  async getAllMenusWithSubmenus() {
    return this.menuService.getAllMenusWithSubmenus();
  }

  @Get('admin/:menuId')
  getMenuWithSubmenus(@Param('menuId') menuId: string) {
    return this.menuService.getMenuWithSubmenus(menuId);
  }
}

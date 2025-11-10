import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from './menu.schema';
import { Submenu } from './submenu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';
import { CreateSubmenuDto } from './dto/create-submenu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<Menu>,
    @InjectModel(Submenu.name) private submenuModel: Model<Submenu>,
  ) {}

  // ✅ Create menu
  async createMenu(data: CreateMenuDto) {
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');
    return this.menuModel.create({ ...data, slug });
  }

  // ✅ Get all menus (public)
  async getAllMenus() {
    return this.menuModel.find().lean().exec();
  }

  // ✅ Get all menus with submenus (for admin panel)
  async getAllWithSubmenus() {
    const menus = await this.menuModel.find().lean();
    const submenus = await this.submenuModel.find().lean();

    return menus.map((menu) => ({
      ...menu,
      submenus: submenus.filter(
        (s) => s.parent_id && s.parent_id.toString() === menu._id.toString(),
      ),
    }));
  }

  // ✅ Update menu
  async updateMenu(id: string, data: CreateMenuDto) {
    return this.menuModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  // ✅ Delete menu + related submenus
  async deleteMenu(id: string) {
    await this.submenuModel.deleteMany({ parent_id: id });
    return this.menuModel.findByIdAndDelete(id).lean();
  }

  // ✅ Create submenu
  async createSubmenu(data: CreateSubmenuDto) {
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');
    return this.submenuModel.create({ ...data, slug });
  }

  // ✅ Delete submenu
  async deleteSubmenu(id: string) {
    return this.submenuModel.findByIdAndDelete(id).lean();
  }
}

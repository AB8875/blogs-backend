import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu } from './menu.schema';
import { Submenu } from './submenu.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<Menu>,
    @InjectModel(Submenu.name) private submenuModel: Model<Submenu>,
  ) {}

  async createMenu(data) {
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');
    return this.menuModel.create({ ...data, slug });
  }

  async getAllMenus() {
    return this.menuModel.find().exec();
  }

  async getAllWithSubmenus() {
    const menus = await this.menuModel.find().lean();
    const submenus = await this.submenuModel.find().lean();

    return menus.map((menu) => ({
      ...menu,
      submenus: submenus.filter(
        (s) => s.parent_id.toString() === menu._id.toString(),
      ),
    }));
  }

  async updateMenu(id: string, data: any) {
    return this.menuModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteMenu(id: string) {
    await this.submenuModel.deleteMany({ parent_id: id });
    return this.menuModel.findByIdAndDelete(id);
  }

  // Submenu operations
  async createSubmenu(data) {
    const slug = data.slug || data.name.toLowerCase().replace(/\s+/g, '-');
    return this.submenuModel.create({ ...data, slug });
  }

  async deleteSubmenu(id: string) {
    return this.submenuModel.findByIdAndDelete(id);
  }
}

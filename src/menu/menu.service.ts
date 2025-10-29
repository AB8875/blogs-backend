import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Menu, MenuDocument } from './menu.schema';
import { Submenu, SubmenuDocument } from './submenu.schema';
import { slugify } from '../utils/slugify'; // create a small helper function to generate slug

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<MenuDocument>,
    @InjectModel(Submenu.name) private submenuModel: Model<SubmenuDocument>,
  ) {}

  // ---------------- Menu Operations ----------------
  async findAllMenus(): Promise<Menu[]> {
    return this.menuModel.find().sort({ createdAt: -1 }).exec();
  }

  async findMenuById(id: string): Promise<Menu> {
    const menu = await this.menuModel.findById(id).exec();
    if (!menu) throw new NotFoundException('Menu not found');
    return menu;
  }

  async createMenu(
    data: Partial<Menu> & { submenus?: Partial<Submenu>[] },
  ): Promise<{ menu: Menu; submenus: Submenu[] }> {
    if (!data.slug && data.name) data.slug = slugify(data.name);

    const menu = new this.menuModel(data);
    const savedMenu = await menu.save();

    let savedSubmenus: Submenu[] = [];

    if (data.submenus && data.submenus.length > 0) {
      const subData = data.submenus.map((sub) => {
        if (!sub.name) throw new NotFoundException('Submenu name is required');
        return {
          name: sub.name,
          slug: sub.slug || slugify(sub.name),
          description: sub.description || '',
          parent_id: savedMenu._id,
          status: sub.status !== undefined ? sub.status : true,
        };
      });

      savedSubmenus = await this.submenuModel.insertMany(subData);
    }

    return { menu: savedMenu, submenus: savedSubmenus };
  }

  async updateMenu(
    id: string,
    data: Partial<Menu> & { submenus?: Partial<Submenu>[] },
  ): Promise<{ menu: Menu; submenus: Submenu[] }> {
    if (!data.slug && data.name) data.slug = slugify(data.name);

    const updatedMenu = await this.menuModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedMenu) throw new NotFoundException('Menu not found');

    let savedSubmenus: Submenu[] = [];

    if (data.submenus && data.submenus.length > 0) {
      const subData = data.submenus.map((sub) => {
        if (!sub.name) throw new NotFoundException('Submenu name is required');
        return {
          name: sub.name,
          slug: sub.slug || slugify(sub.name),
          description: sub.description || '',
          parent_id: updatedMenu._id,
          status: sub.status !== undefined ? sub.status : true,
        };
      });

      savedSubmenus = await this.submenuModel.insertMany(subData);
    }

    // Return all submenus of this menu
    const allSubmenus = await this.findSubmenusByParentId(id);
    return { menu: updatedMenu, submenus: allSubmenus };
  }

  async removeMenu(id: string): Promise<{ deleted: boolean }> {
    await this.submenuModel.deleteMany({ parent_id: id }).exec();
    const deleted = await this.menuModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Menu not found');
    return { deleted: true };
  }

  // ---------------- Submenu Operations ----------------
  async findAllSubmenus(): Promise<Submenu[]> {
    return this.submenuModel.find().sort({ createdAt: -1 }).exec();
  }

  async findSubmenuById(id: string): Promise<Submenu> {
    const submenu = await this.submenuModel.findById(id).exec();
    if (!submenu) throw new NotFoundException('Submenu not found');
    return submenu;
  }

  async findSubmenusByParentId(parentId: string): Promise<Submenu[]> {
    return this.submenuModel
      .find({ parent_id: new Types.ObjectId(parentId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async createSubmenu(data: Partial<Submenu>): Promise<Submenu> {
    if (!data.slug && data.name) data.slug = slugify(data.name);
    if (!data.parent_id)
      throw new NotFoundException('Parent menu (parent_id) is required');
    const submenu = new this.submenuModel({
      ...data,
      parent_id: new Types.ObjectId(data.parent_id),
    });
    return submenu.save();
  }

  async updateSubmenu(id: string, data: Partial<Submenu>): Promise<Submenu> {
    if (!data.slug && data.name) data.slug = slugify(data.name);
    const updated = await this.submenuModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Submenu not found');
    return updated;
  }

  async removeSubmenu(id: string): Promise<{ deleted: boolean }> {
    const deleted = await this.submenuModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Submenu not found');
    return { deleted: true };
  }

  // ---------------- Combined Menu + Submenus for Admin ----------------
  async getMenuWithSubmenus(
    menuId: string,
  ): Promise<{ menu: Menu; submenus: Submenu[] }> {
    const menu = await this.findMenuById(menuId);
    const submenus = await this.findSubmenusByParentId(menuId);
    return { menu, submenus };
  }

  async getAllMenusWithSubmenus(): Promise<
    Array<{ menu: Menu; submenus: Submenu[] }>
  > {
    const menus = await this.findAllMenus();

    const result = await Promise.all(
      menus.map(async (menu) => {
        const submenus = await this.findSubmenusByParentId(menu._id.toString());
        return { menu, submenus };
      }),
    );

    return result;
  }
}

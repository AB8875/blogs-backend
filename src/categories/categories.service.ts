import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from './categories.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(data: Partial<Category>): Promise<Category> {
    const cat = new this.categoryModel(data);
    return cat.save();
  }

  async update(id: string, data: Partial<Category>): Promise<Category> {
    const updated = await this.categoryModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Category not found');
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const deleted = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Category not found');
    return { deleted: true };
  }
}

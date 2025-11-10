import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {
    console.log('>>> PostsService is injecting model with name:', Post.name);
  }

  async findAll(menu?: string, submenu?: string) {
    const filter: any = {};
    if (menu) filter.menu = menu;
    if (submenu) filter.submenu = submenu;
    return this.postModel.find(filter).sort({ createdAt: -1 }).lean().exec();
  }

  async findOne(id: string) {
    const post = await this.postModel.findById(id).lean().exec();
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async create(dto: any) {
    const now = new Date().toISOString();
    const post = new this.postModel({
      ...dto,
      createdAt: now,
      updatedAt: now,
    });
    return post.save();
  }

  async update(id: string, update: any) {
    return this.postModel
      .findByIdAndUpdate(
        id,
        { ...update, updatedAt: new Date().toISOString() },
        { new: true },
      )
      .exec();
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.postModel.findByIdAndDelete(id).exec();
    return { deleted: true };
  }
}

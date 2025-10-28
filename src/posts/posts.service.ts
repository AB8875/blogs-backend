import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  private posts = new Map<string, any>();

  findAll(category?: string) {
    const all = Array.from(this.posts.values());
    if (category) {
      return all.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase(),
      );
    }
    return all;
  }

  findOne(id: string) {
    const p = this.posts.get(id);
    if (!p) throw new NotFoundException('Post not found');
    return p;
  }

  create(dto: any) {
    const id = uuid();
    const created = {
      _id: id,
      title: dto.title || 'Untitled',
      slug: dto.slug || dto.title?.toLowerCase().replace(/\s+/g, '-') || id,
      description: dto.description || '',
      content: dto.content || '',
      category: dto.category || '',
      subCategory: dto.subCategory || '',
      thumbnail: dto.thumbnail || '',
      authors: dto.authors || [],
      status: dto.status || 'draft',
      tags: dto.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...dto,
    };
    this.posts.set(id, created);
    return created;
  }

  update(id: string, update: any) {
    const p = this.findOne(id);
    const updated = { ...p, ...update, updatedAt: new Date().toISOString() };
    this.posts.set(id, updated);
    return updated;
  }

  remove(id: string) {
    this.findOne(id);
    this.posts.delete(id);
    return { deleted: true };
  }

  seed(posts: any[]) {
    posts.forEach((p) => this.posts.set(p._id, p));
  }
}

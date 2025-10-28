import { Injectable, NotFoundException } from '@nestjs/common';
const { v4: uuid } = require('uuid');

@Injectable()
export class CategoriesService {
  private categories = new Map<string, any>();

  findAll() {
    return Array.from(this.categories.values());
  }

  async create(data: any) {
    const { v4: uuid } = await import('uuid');
    const id = uuid();
    const cat = { id, ...data, created_at: new Date().toISOString() };
    this.categories.set(id, cat);
    return cat;
  }

  update(id: string, update: any) {
    const c = this.categories.get(id);
    if (!c) throw new NotFoundException('Category not found');
    const updated = { ...c, ...update };
    this.categories.set(id, updated);
    return updated;
  }

  remove(id: string) {
    if (!this.categories.has(id))
      throw new NotFoundException('Category not found');
    this.categories.delete(id);
    return { deleted: true };
  }

  seed(categories: any[]) {
    categories.forEach((c) => this.categories.set(c.id, c));
  }
}

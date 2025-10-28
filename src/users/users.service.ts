import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

type User = {
  _id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'editor' | 'author';
  createdAt: string;
  password?: string; // demo only
  avatar_url?: string;
};

@Injectable()
export class UsersService {
  private users = new Map<string, User>();

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  findOne(id: string): User {
    const u = this.users.get(id);
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = Array.from(this.users.values()).find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    return found || null;
  }

  create(data: Partial<User>): User {
    const id = uuid();
    const now = new Date().toISOString();
    const user: User = {
      _id: id,
      full_name: data.full_name || 'New User',
      email: data.email || `user+${id}@example.com`,
      role: (data.role as any) || 'author',
      createdAt: now,
      password: data.password || 'changeme', // demo, replace w/ hashed
      avatar_url: data.avatar_url || '',
    };
    this.users.set(id, user);
    return user;
  }

  update(id: string, update: Partial<User>): User {
    const user = this.findOne(id);
    const updated = { ...user, ...update };
    this.users.set(id, updated);
    return updated;
  }

  remove(id: string) {
    this.findOne(id);
    this.users.delete(id);
    return { deleted: true };
  }

  // Used by seeder
  seed(users: User[]) {
    users.forEach((u) => this.users.set(u._id, u));
  }
}

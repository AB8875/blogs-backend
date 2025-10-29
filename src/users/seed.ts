// users/seed.ts
import { UsersService } from './users.service';
import * as mongoose from 'mongoose';

async function seedAdmin() {
  await mongoose.connect('mongodb://localhost:27017/dasalon');
  const usersService = new UsersService();
  await usersService.create({
    full_name: 'Admin Demo',
    email: 'admin@gmail.com',
    password: 'admin123',
    role: 'admin',
  });
  console.log('Admin seeded!');
  process.exit(0);
}

seedAdmin();

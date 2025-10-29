// users/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from './users.service';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const usersService = app.get(UsersService);
    await usersService.create({
      name: 'Admin Demo',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
    });
    // eslint-disable-next-line no-console
    console.log('Admin seeded!');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Seeding admin failed:', err);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

seedAdmin().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});

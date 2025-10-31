import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from './users.service';
import { UserRole } from './user.schema';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const usersService = app.get(UsersService);

    const adminEmail = 'admin@gmail.com';

    // Check if admin already exists
    const existingAdmin = await usersService.findByEmail(adminEmail);

    if (existingAdmin) {
      // Update role and password for admin user
      await usersService.update(
        String(existingAdmin._id), // <-- cast ObjectId to string!
        {
          role: UserRole.ADMIN,
          password: 'admin123', // update password as needed
          name: 'Admin Demo', // optionally update name as well
        },
      );
      console.log('Admin user updated!');
    } else {
      // Create if does not exist
      await usersService.create({
        name: 'Admin Demo',
        email: adminEmail,
        password: 'admin123',
        role: UserRole.ADMIN,
      });
      console.log('Admin user seeded!');
    }
  } catch (err) {
    console.error('Seeding admin failed:', err);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

seedAdmin().catch((e) => {
  console.error(e);
  process.exit(1);
});

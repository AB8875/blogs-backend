import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { SettingsModule } from './settings/settings.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SeedModule } from './seed/seed.module';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || '';

if (!mongoUri) {
  // eslint-disable-next-line no-console
  console.error(
    '❌ Missing MONGO_URI in .env file. Please check your backend .env',
  );
}

@Module({
  imports: [
    // ✅ Connect to MongoDB Atlas (safe version)
    MongooseModule.forRoot(mongoUri),

    // ✅ App modules
    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule,
    SettingsModule,
    DashboardModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

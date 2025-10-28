import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { PostsModule } from '../posts/posts.module';
import { CategoriesModule } from '../categories/categories.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PostsModule, CategoriesModule, UsersModule],
  controllers: [DashboardController],
})
export class DashboardModule {}

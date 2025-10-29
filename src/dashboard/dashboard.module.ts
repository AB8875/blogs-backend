import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { PostsModule } from '../posts/posts.module';
import { MenuModule } from '../menu/menu.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PostsModule, MenuModule, UsersModule],
  controllers: [DashboardController],
})
export class DashboardModule {}

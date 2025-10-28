import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { CategoriesModule } from '../categories/categories.module';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [UsersModule, PostsModule, CategoriesModule, SettingsModule],
  providers: [SeedService],
})
export class SeedModule {}

import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { MenuModule } from '../menu/menu.module';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [UsersModule, PostsModule, MenuModule, SettingsModule],
  providers: [SeedService],
})
export class SeedModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { SettingsModule } from './settings/settings.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
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

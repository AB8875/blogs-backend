import { Controller, Get } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';

@Controller('api')
export class DashboardController {
  constructor(
    private readonly posts: PostsService,
    private readonly categories: CategoriesService,
    private readonly users: UsersService,
  ) {}

  @Get('dashboard-stats')
  stats() {
    const totalPosts = this.posts.findAll().length;
    const totalCategories = this.categories.findAll().length;
    const totalUsers = this.users.findAll().length;
    // Placeholder: sum of views could be a property on posts; using 0 here
    const totalViews = this.posts
      .findAll()
      .reduce((acc, p) => acc + (p.views || 0), 0);
    return { totalPosts, totalCategories, totalUsers, totalViews };
  }
}

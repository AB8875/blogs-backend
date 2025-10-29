import { Controller, Get } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { MenuService } from '../menu/menu.service';
import { UsersService } from '../users/users.service';

@Controller()
export class DashboardController {
  constructor(
    private readonly posts: PostsService,
    private readonly menuService: MenuService,
    private readonly users: UsersService,
  ) {}

  @Get('dashboard-stats')
  async stats() {
    const totalPosts = this.posts.findAll().length;
    const totalMenus = (await this.menuService.findAllMenus()).length;
    const totalUsers = this.users.findAll().length;
    // Placeholder: sum of views could be a property on posts; using 0 here
    const totalViews = this.posts
      .findAll()
      .reduce((acc, p) => acc + (p.views || 0), 0);
    return { totalPosts, totalMenus, totalUsers, totalViews };
  }
}

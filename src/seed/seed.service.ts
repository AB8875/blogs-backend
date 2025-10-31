import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
import { MenuService } from '../menu/menu.service';
import { SettingsService } from '../settings/settings.service';
import { v4 as uuid } from 'uuid';
import { UserRole } from '../users/user.schema'; // Make sure enum is imported

@Injectable()
export class SeedService {
  constructor(
    private readonly users: UsersService,
    private readonly posts: PostsService,
    private readonly menuService: MenuService,
    private readonly settings: SettingsService,
  ) {}

  async run() {
    // Users (demo admin)
    const demoAdminId = uuid();
    const demoUser = {
      _id: demoAdminId,
      name: 'Admin Demo',
      email: 'admin@gmail.com',
      role: UserRole.ADMIN,
      createdAt: new Date().toISOString(),
      password: 'admin123', // demo only
      avatar_url: '',
    };
    await this.users.create(demoUser);

    // Menus and Submenus
    const defaultMenus = [
      {
        name: 'BEAUTY',
        slug: 'beauty',
        subCategories: [
          'beauty tips',
          'hair',
          'facial',
          'skin',
          'grooming',
          'makeup',
          'nail',
        ],
      },
      {
        name: 'TRENDS',
        slug: 'trends',
        subCategories: ['influencers', 'beauty trends', 'celebrities'],
      },
      {
        name: 'CAREER',
        slug: 'career',
        subCategories: ['hiring talent', 'career tips'],
      },
      {
        name: 'FEATURES',
        slug: 'features',
        subCategories: ['interview stories'],
      },
      {
        name: 'PRODUCT',
        slug: 'product',
        subCategories: ['product', 'equipment'],
      },
      {
        name: 'LOCATION',
        slug: 'location',
        subCategories: ['india', 'singapore'],
      },
    ];

    for (const menuData of defaultMenus) {
      const { subCategories, ...menuFields } = menuData;
      const createdMenu = await this.menuService.createMenu(menuFields);

      for (const subName of subCategories) {
        const subSlug = subName.toLowerCase().replace(/\s+/g, '-');
        await this.menuService.createSubmenu({
          name: subName,
          slug: subSlug,
          parent_id: createdMenu._id as any,
        });
      }
    }

    // Sample posts (use loop with await for each post)
    const samplePosts = [
      {
        _id: uuid(),
        title: '10 Beauty Hacks That Actually Work',
        category: 'BEAUTY',
        subCategory: 'beauty tips',
        authors: [{ name: 'Aarushi Mehta' }],
        email: 'aarushi@example.com',
        createdAt: new Date('2025-10-20').toISOString(),
        time: '10:30',
        status: 'published',
        tags: ['makeup', 'skincare', 'daily tips'],
        type: 'free',
        description:
          'Learn the top 10 simple beauty hacks to upgrade your daily routine.',
        content:
          'Learn the top 10 simple beauty hacks to upgrade your daily routine.',
        thumbnail: '',
        images: [],
        views: 0,
      },
      {
        _id: uuid(),
        title: 'Top Trends in Hair Styling for 2025',
        category: 'TRENDS',
        subCategory: 'beauty trends',
        authors: [{ name: 'Kavita Sharma' }],
        email: 'kavita@example.com',
        createdAt: new Date('2025-10-24').toISOString(),
        time: '09:00',
        status: 'draft',
        tags: ['hairstyle', 'fashion', 'celebrity'],
        type: 'free',
        description:
          'Discover this year’s most trending hairstyles and how to get the look.',
        content:
          'Discover this year’s most trending hairstyles and how to get the look.',
        thumbnail: '',
        images: [],
        views: 0,
      },
    ];

    // Seed posts individually
    for (const post of samplePosts) {
      await this.posts.create(post);
    }

    // Settings default (assuming .create exists)
    const defaultSettings = {
      _id: uuid(),
      site_name: 'daSalon',
      site_description: 'Recreation of dasalon-blogs',
      logo_url: '',
      favicon_url: '',
      facebook_url: '',
      twitter_url: '',
      instagram_url: '',
      linkedin_url: '',
      theme: 'light',
      posts_per_page: 10,
      updated_at: new Date().toISOString(),
    };

    // Use create or update depending on your service API
    await this.settings.create(defaultSettings);

    // Gather statistics
    const allUsers = (await this.users.findAll?.()) ?? [];
    const allPosts = (await this.posts.findAll?.()) ?? [];

    return {
      users: Array.isArray(allUsers) ? allUsers.length : 0,
      menus: (await this.menuService.getAllMenus()).length,
      posts: Array.isArray(allPosts) ? allPosts.length : 0,
      settings: await this.settings.get(),
    };
  }
}

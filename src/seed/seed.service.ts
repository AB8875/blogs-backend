import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';
import { CategoriesService } from '../categories/categories.service';
import { SettingsService } from '../settings/settings.service';
import { v4 as uuid } from 'uuid';

/**
 * Seeds the in-memory stores with the sample data found in the frontend admin pages.
 * Run this programmatically after app bootstrap or expose an endpoint to trigger it.
 */
@Injectable()
export class SeedService {
  constructor(
    private readonly users: UsersService,
    private readonly posts: PostsService,
    private readonly categories: CategoriesService,
    private readonly settings: SettingsService,
  ) {}

  run() {
    // Users (demo)
    const demoAdminId = uuid();
    const demoUser = {
      _id: demoAdminId,
      full_name: 'Admin Demo',
      email: 'admin@gmail.com',
      role: 'admin' as 'admin',
      createdAt: new Date().toISOString(),
      password: 'admin123', // demo only
      avatar_url: '',
    };
    this.users.seed([demoUser]);

    // Categories from frontend defaultCategories
    const defaultCategories = [
      {
        id: '1',
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
        parent_id: null,
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'TRENDS',
        slug: 'trends',
        subCategories: ['influencers', 'beauty trends', 'celebrities'],
        parent_id: null,
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'CAREER',
        slug: 'career',
        subCategories: ['hiring talent', 'career tips'],
        parent_id: null,
        created_at: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'FEATURES',
        slug: 'features',
        subCategories: ['interview stories'],
        parent_id: null,
        created_at: new Date().toISOString(),
      },
      {
        id: '5',
        name: 'PRODUCT',
        slug: 'product',
        subCategories: ['product', 'equipment'],
        parent_id: null,
        created_at: new Date().toISOString(),
      },
      {
        id: '6',
        name: 'LOCATION',
        slug: 'location',
        subCategories: ['india', 'singapore'],
        parent_id: null,
        created_at: new Date().toISOString(),
      },
    ];
    this.categories.seed(defaultCategories);

    // Sample posts from frontend samplePosts (converted to backend post shape)
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
    this.posts.seed(samplePosts);

    // Settings default
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
    this.settings.seed(defaultSettings);

    return {
      users: this.users.findAll().length,
      categories: this.categories.findAll().length,
      posts: this.posts.findAll().length,
      settings: this.settings.get(),
    };
  }
}

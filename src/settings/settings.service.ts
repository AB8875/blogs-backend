import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SettingsService {
  private settings: any = null;

  get() {
    return this.settings;
  }

  getById(id: string) {
    if (!this.settings || this.settings._id !== id)
      throw new NotFoundException('Settings not found');
    return this.settings;
  }

  create(data: any) {
    const id = uuid();
    this.settings = { _id: id, ...data };
    return this.settings;
  }

  update(id: string, data: any) {
    if (!this.settings || this.settings._id !== id)
      throw new NotFoundException('Settings not found');
    this.settings = { ...this.settings, ...data };
    return this.settings;
  }

  seed(settings: any) {
    this.settings = settings;
  }
}

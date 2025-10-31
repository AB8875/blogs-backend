import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './settings.schema';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings.name)
    private settingsModel: Model<SettingsDocument>,
  ) {}

  async get() {
    const settings = await this.settingsModel.findOne().exec();
    return settings;
  }

  async getById(id: string) {
    const settings = await this.settingsModel.findById(id).exec();
    if (!settings) throw new NotFoundException('Settings not found');
    return settings;
  }

  async create(data: any) {
    const settings = new this.settingsModel(data);
    return settings.save();
  }

  async update(id: string, data: any) {
    const settings = await this.settingsModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!settings) throw new NotFoundException('Settings not found');
    return settings;
  }

  async seed(settings: any) {
    const existing = await this.settingsModel.findOne().exec();
    if (existing) {
      return this.settingsModel
        .findByIdAndUpdate(existing._id, settings, { new: true })
        .exec();
    }
    return this.create(settings);
  }
}

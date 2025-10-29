import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get()
  getSettings() {
    return this.settings.get();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.settings.getById(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.settings.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.settings.update(id, body);
  }
}

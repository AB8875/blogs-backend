import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema({ timestamps: true })
export class Settings {
  @Prop({ required: true })
  siteName: string;

  @Prop({ required: true })
  siteDescription: string;

  @Prop()
  logo?: string;

  @Prop()
  favicon?: string;

  @Prop({ type: Object })
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };

  @Prop({ type: Object })
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };

  @Prop({ type: Object })
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);

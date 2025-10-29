import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema({ timestamps: true })
export class Menu {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description?: string;

  // Status (active/inactive)
  @Prop({ default: true })
  status: boolean;
  _id: any;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);

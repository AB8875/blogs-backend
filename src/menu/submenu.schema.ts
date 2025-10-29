import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubmenuDocument = Submenu & Document;

@Schema({ timestamps: true })
export class Submenu {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description?: string;

  // Reference to parent Menu
  @Prop({ type: Types.ObjectId, ref: 'Menu', required: true })
  parent_id: Types.ObjectId;

  // Status (active/inactive)
  @Prop({ default: true })
  status: boolean;
}

export const SubmenuSchema = SchemaFactory.createForClass(Submenu);

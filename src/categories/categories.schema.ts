import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description?: string;

  // For parent-child relationships
  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parent_id?: Types.ObjectId | null;

  // Subcategories as string array
  @Prop({ type: [String], default: [] })
  subCategories: string[];

  // Status (active/inactive)
  @Prop({ default: true })
  status: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

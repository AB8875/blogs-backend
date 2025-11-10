import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true }) title: string;
  @Prop() slug: string;
  @Prop() description: string;
  @Prop() content: string; // HTML
  @Prop({ required: true }) menu: string;
  @Prop() submenu: string;
  @Prop() thumbnail: string;
  @Prop({ type: [String] }) authors: string[];
  @Prop() status: string;
  @Prop({ type: [String] }) tags: string[];
  @Prop() shareUrl: string;
  @Prop() featured: boolean;
  @Prop({ type: [String] }) images: string[];
  @Prop({ default: 0 }) views: number;
  @Prop() createdAt: string;
  @Prop() updatedAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

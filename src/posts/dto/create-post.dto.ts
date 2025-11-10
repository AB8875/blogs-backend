import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsString()
  menu: string;

  @IsOptional()
  @IsString()
  submenu?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsArray()
  authors: string[];

  @IsOptional()
  @IsString()
  status?: string;

  @IsArray()
  tags: string[];

  @IsOptional()
  @IsString()
  shareUrl?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsArray()
  @IsOptional()
  images?: string[];
}

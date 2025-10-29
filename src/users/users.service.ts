import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  seed(
    arg0: {
      _id: any;
      full_name: string;
      email: string;
      role: 'admin';
      createdAt: string;
      password: string;
      avatar_url: string;
    }[],
  ) {
    throw new Error('Method not implemented.');
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password');
  }

  async create(data: Partial<User>): Promise<User> {
    const user = new this.userModel(data);
    return user.save();
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    await this.userModel.updateOne({ email }, { password: newPassword });
  }
}

import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
// import { ChangePasswordDto } from './dto/change-password.dto';
// import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private createToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret-key', {
      expiresIn: '7d',
    });
  }

  async signup(dto: SignupDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new BadRequestException('Email already exists');

    const user = await this.usersService.create(dto);
    const token = this.createToken({
      id: user['_id'],
      email: user.email,
      role: user.role,
    });
    return { message: 'Signup successful', token, user };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid email or password');

    const token = this.createToken({
      id: user['_id'],
      email: user.email,
      role: user.role,
    });
    return { message: 'Login successful', token, user };
  }

  async me(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'secret-key',
      ) as any;
      return this.usersService.findById(decoded.id);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // async changePassword(userId: string, dto: ChangePasswordDto) {
  //   const user = await this.usersService.findById(userId);
  //   if (!user) throw new UnauthorizedException('User not found');

  //   const match = await bcrypt.compare(dto.oldPassword, user.password);
  //   if (!match) throw new UnauthorizedException('Incorrect old password');

  //   const salt = await bcrypt.genSalt(10);
  //   user.password = await bcrypt.hash(dto.newPassword, salt);
  //   await user.save();
  //   return { message: 'Password changed successfully' };
  // }

  // async resetPassword(dto: ResetPasswordDto) {
  //   const user = await this.usersService.findByEmail(dto.email);
  //   if (!user) throw new BadRequestException('Email not found');

  //   const salt = await bcrypt.genSalt(10);
  //   user.password = await bcrypt.hash(dto.newPassword, salt);
  //   await user.save();

  //   return { message: 'Password reset successfully' };
  // }
}

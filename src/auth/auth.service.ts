// auth.service.ts
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

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // Create JWT token
  private createToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret-key', {
      expiresIn: '7d',
    });
  }

  // Signup
  async signup(dto: SignupDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) throw new BadRequestException('Email already exists');

    const user = await this.usersService.create(dto);
    const token = this.createToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return { message: 'Signup successful', token, user };
  }

  // Login
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid email or password');

    const token = this.createToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return { message: 'Login successful', token, user };
  }

  // Get current user
  async me(token: string) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'secret-key',
      ) as any;
      const user = await this.usersService.findById(decoded.id);
      if (!user) throw new UnauthorizedException('User not found');
      return user;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

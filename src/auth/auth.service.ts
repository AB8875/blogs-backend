import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    // Demo behavior: if demo credentials, accept them or match stored password
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // In this seed/demo phase we accept plaintext matching (replace with hashed check later)
    if (user.password && user.password === password) {
      const token = jwt.sign(
        { sub: user._id, role: user.role, email: user.email },
        process.env.JWT_SECRET || 'dev-secret',
        { expiresIn: '7d' },
      );

      // Do not return password field
      const { password: _p, ...safeUser } = user as any;
      return { token, user: safeUser };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}

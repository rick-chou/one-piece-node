import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  async loginWithToken(user: Partial<User>) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
    });

    return { token };
  }
}

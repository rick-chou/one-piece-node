import { User } from '@/user/entities/user.entity';
import { UserService } from '@/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { Repository } from 'typeorm';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET'),
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(user: User) {
    const existUser = await this.userService.getUser(user);
    if (!existUser) {
      throw new UnauthorizedException('incorrect token');
    }
    return existUser;
  }
}

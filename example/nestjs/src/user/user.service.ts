import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser({ username }: Partial<User>) {
    return await this.userRepository.findOne({
      where: { username },
    });
  }

  async register(createUser: CreateUserDto) {
    const existUser = await this.getUser(createUser);
    if (existUser) {
      throw new HttpException(
        'username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = this.userRepository.create(createUser);
    // avoid return password

    // method one
    // await this.userRepository.save(newUser);
    // return await this.userRepository.findOne({ where: { username } });

    // method two
    return this.userRepository.save(newUser);
  }
}

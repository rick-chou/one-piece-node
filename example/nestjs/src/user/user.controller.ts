import { Public } from '@/annotation/public';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @ApiOperation({ summary: 'register user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: [User] })
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @ApiOperation({ summary: 'get user info' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getUserInfo(@Req() req) {
    return this.userService.getUser(req.user.username);
  }
}

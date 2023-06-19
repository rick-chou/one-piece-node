import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  GHOST = 'ghost',
}

export class CreateUserDto {
  @ApiProperty({ description: 'username' })
  @IsNotEmpty({ message: 'missing username' })
  readonly username: string;

  @ApiProperty({ description: 'password' })
  @IsNotEmpty({ message: 'missing password' })
  readonly password: string;

  @ApiProperty({ description: 'password' })
  @IsNotEmpty({ message: 'missing password' })
  @IsEnum(UserRole, { message: 'invalid role' })
  readonly role: string;

  @ApiPropertyOptional({ description: 'avatar' })
  readonly avatar: string;

  @ApiPropertyOptional({ description: 'email' })
  @IsEmail({}, { message: 'invalid email message' })
  readonly email: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: 'User name' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @ApiProperty({ description: 'User email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

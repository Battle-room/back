import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { validationOptionsMsg } from "src/utils/GLOBALS";


export class CreateUserDTO {
  @ApiProperty({
    description: 'Email of user'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Username of user'
  })
  @IsString()
  username: string

  @ApiProperty({
    description: 'User\'s password'
  })
  @MinLength(4, validationOptionsMsg('Password must be between 4 and 25'))
  @MaxLength(25, validationOptionsMsg('Password must be between 4 and 25'))
  password: string
}
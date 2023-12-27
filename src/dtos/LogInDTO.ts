import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { validationOptionsMsg } from "src/utils/GLOBALS";


export class LogInDTO {
  @ApiProperty({
    description: 'Email of user'
  })
  @IsEmail({}, validationOptionsMsg('Email is not an email'))
  email: string

  @ApiProperty({
    description: 'Username of user'
  })
  username: string

  @ApiProperty({
    description: 'User\'s password'
  })
  password: string
}
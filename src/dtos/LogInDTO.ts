import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class LogInDTO {
  @ApiProperty({
    description: 'Email of user'
  })
  //@IsEmail()
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
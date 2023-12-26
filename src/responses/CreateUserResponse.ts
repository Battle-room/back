import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";


export class CreateUserResponse {
  @ApiProperty({
    description: 'Email of user'
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Username of user'
  })
  username: string
}
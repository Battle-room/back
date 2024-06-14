import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDTO {
  @ApiProperty({ description: 'New user username' })
  @IsString()
  @IsNotEmpty()
  username: string;
}
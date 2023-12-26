import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponse {
  @ApiProperty()
    accessToken: string;
}
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ description: 'User id' })
  id: string;

  @ApiProperty({ description: 'Username' })
  username: string;

  @ApiProperty({ description: 'User email' })
  email: string;
}

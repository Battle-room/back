import { IsOptional } from 'class-validator';

export class UniqueUserDTO {
  @IsOptional()
    email?: string;

  @IsOptional()
    username?: string;

  @IsOptional()
    id?: string;
}
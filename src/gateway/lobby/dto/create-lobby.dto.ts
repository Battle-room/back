import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLobbyDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  password: string;

  @IsString()
  @IsNotEmpty()
  packageId: string;
}

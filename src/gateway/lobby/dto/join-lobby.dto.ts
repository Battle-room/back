import { IsNotEmpty, IsString } from 'class-validator';

export class JoinLobbyDTO {
  @IsString()
  @IsNotEmpty()
  lobbyId: string;

  @IsString()
  password: string;
}

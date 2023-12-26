import { IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../utils/GLOBALS';

export class TokenDTO {
  @IsNotEmpty(validationOptionsMsg('Access token cannot be empty'))
    accessToken: string;
}
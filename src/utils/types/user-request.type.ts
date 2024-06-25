import { User } from 'src/database/entities/user.entity';

export interface URequest extends Request {
  user?: User;
}

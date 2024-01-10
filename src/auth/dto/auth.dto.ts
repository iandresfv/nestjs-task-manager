import { IsNotEmpty, IsString } from 'class-validator';
import { AuthPayload } from '../interfaces/auth.interface';

export class AuthDTO implements AuthPayload {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

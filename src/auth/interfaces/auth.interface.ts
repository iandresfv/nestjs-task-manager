import { ROLES } from 'src/constants';

export interface PayloadToken {
  sub: string;
  role: ROLES;
}

export interface AuthPayload {
  username: string;
  password: string;
}

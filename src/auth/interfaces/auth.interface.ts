import { ROLES } from 'src/constants';

export interface PayloadToken {
  sub: string;
  role: ROLES;
}

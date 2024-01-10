import * as jwt from 'jsonwebtoken';
import { AuthTokenResult, IUseToken } from 'src/auth/interfaces/auth.interface';

export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;
    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: decode.exp < Date.now() / 1000,
    };
  } catch (error) {
    return 'Invalid token';
  }
};

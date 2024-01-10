import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/user/entities';
import { PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(username: string, password: string) {
    const userByUsername = await this.userService.findUserBy({
      key: 'username',
      value: username,
    });
    const userByEmail = await this.userService.findUserBy({
      key: 'email',
      value: username,
    });
    if (userByUsername) {
      const isMatch = await bcrypt.compare(password, userByUsername.password);
      if (isMatch) {
        return userByUsername;
      }
    }
    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password);
      if (isMatch) {
        return userByEmail;
      }
    }
    return null;
  }

  public signJWT({
    payload,
    secret,
    expiresIn,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expiresIn: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  public async generateJWT({ id }: UserEntity): Promise<any> {
    const user = await this.userService.findUserById(id);
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      }),
      user,
    };
  }
}

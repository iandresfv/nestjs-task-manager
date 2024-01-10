import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';

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
}

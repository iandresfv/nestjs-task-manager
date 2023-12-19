import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UserEntity> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find();
      if (!users.length) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findUserById(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found',
        });
      }
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    id: string,
    body: UserUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const updatedUser: UpdateResult = await this.userRepository.update(
        id,
        body,
      );
      if (updatedUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to update user',
        });
      }
      return updatedUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const deletedUser: DeleteResult = await this.userRepository.delete(id);
      if (deletedUser.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Unable to delete user',
        });
      }
      return deletedUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
